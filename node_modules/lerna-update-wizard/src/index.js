const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const uniq = require("lodash/uniq");
const orderBy = require("lodash/orderBy");
const globby = require("globby");
const semverCompare = require("semver-compare");
const perf = require("execution-time")();

const runCommand = require("./utils/runCommand");
const fileExists = require("./utils/fileExists");
const ui = require("./utils/ui");
const plural = require("./utils/plural");
const invariant = require("./utils/invariant");
const parseDependency = require("./utils/parseDependency");
const sanitizeGitBranchName = require("./utils/sanitizeGitBranchName");

inquirer.registerPrompt(
  "autocomplete",
  require("inquirer-autocomplete-prompt")
);

inquirer.registerPrompt("semverList", require("./prompts/semverList"));

module.exports = async ({ input, flags }) => {
  const { resolve } = path;
  const projectDir = input.shift() || ".";

  // Validate flags
  flags.nonInteractive &&
    invariant(
      flags.dependency,
      "`--dependency` option must be specified in non-interactive mode"
    );

  const projectPackageJsonPath = resolve(projectDir, "package.json");

  invariant(
    await fileExists(projectPackageJsonPath),
    "No 'package.json' found in specified directory"
  );

  const { name: projectName } = require(projectPackageJsonPath);

  // Read `lerna.json` config file
  let lernaConfig = {};
  try {
    lernaConfig = require(resolve(projectDir, "lerna.json"));
  } catch (e) {}

  ui.log.write(
    `\n${chalk.bold("Lerna Update Wizard")}\n${chalk.grey(
      "v" + require("../package.json").version
    )}\n\n`
  );

  ui.logBottom("Collecting packages...");

  const defaultPackagesGlobs = flags.packages
    ? flags.packages.split(",")
    : lernaConfig.packages || ["packages/*"];

  const packagesRead = await globby(
    defaultPackagesGlobs.map(glob => resolve(projectDir, glob, "package.json")),
    { expandDirectories: true }
  );

  const packages = orderBy(
    packagesRead.map(path => ({
      path: path.substr(0, path.length - "package.json".length),
      config: require(path),
    })),
    "config.name"
  );

  invariant(packages.length > 0, "No packages found. Is this a Lerna project?");

  ui.logBottom("");

  const setSourceForDeps = (deps = [], source = "dependencies") =>
    Object.keys(deps).reduce(
      (prev, name) => ({
        ...prev,
        [name]: {
          version: deps[name],
          source,
        },
      }),
      {}
    );

  const dependencies = packages.reduce(
    (prev, { config: { dependencies, devDependencies, name } }) => ({
      ...prev,
      [name]: {
        ...setSourceForDeps(dependencies),
        ...setSourceForDeps(devDependencies, "devDependencies"),
      },
    }),
    {}
  );

  let dependencyMap = packages.reduce(
    (prev, { config: { name: packageName } }) => {
      const packDeps = dependencies[packageName];
      return {
        ...prev,
        ...Object.keys(packDeps).reduce((prev, dep) => {
          const { version, source } = packDeps[dep];
          const prevDep = prev[dep] || { packs: {}, versions: [] };
          const versions = uniq([...prevDep.versions, version]);

          let color = "grey";
          const count = versions.length;

          if (count > 1) color = "yellow";
          if (count > 3) color = "red";

          return {
            ...prev,
            [dep]: {
              ...prevDep,
              name: dep,
              packs: {
                ...prevDep.packs,
                [packageName]: { version, source },
              },
              versions,
              color,
            },
          };
        }, prev),
      };
    },
    {}
  );

  // filter out non-conflicted dependencies when deduping
  if (flags.dedupe) {
    dependencyMap = Object.values(dependencyMap)
      .filter(({ versions }) => versions.length > 1)
      .reduce(
        (prev, { name }) => ({ ...prev, [name]: dependencyMap[name] }),
        {}
      );
  }

  const allDependencies = Object.keys(dependencyMap);

  ui.log.write(`Starting update wizard for ${chalk.white.bold(projectName)}`);
  ui.log.write("");

  let targetDependency =
    flags.dependency && parseDependency(flags.dependency).name;

  if (!targetDependency) {
    const { targetDependency: promptedTarget } = await inquirer.prompt([
      {
        type: "autocomplete",
        name: "targetDependency",
        message: "Select a dependency to upgrade:",
        pageSize: 15,
        source: (_ignore_, input) => {
          const itemize = value => ({
            value,
            name: `${chalk.white(value)} ${chalk[dependencyMap[value].color](
              `(${plural(
                "version",
                "versions",
                dependencyMap[value].versions.length
              )})`
            )}`,
          });

          const sorter = flags.dedupe
            ? (a, b) =>
                dependencyMap[b].versions.length -
                dependencyMap[a].versions.length
            : undefined;

          let results = input
            ? allDependencies
                .filter(name => new RegExp(input).test(name))
                .sort(sorter)
                .map(itemize)
            : allDependencies.sort(sorter).map(itemize);

          if (input && !allDependencies.includes(input)) {
            results = [
              ...results,
              {
                name: `${input} ${chalk.green.bold("[+ADD]")}`,
                value: input,
              },
            ];
          }

          return Promise.resolve(results);
        },
      },
    ]);

    targetDependency = promptedTarget;
  }

  // Look up NPM dependency and its versions

  const npmPackageInfoRaw = await runCommand(
    `npm info ${targetDependency} versions dist-tags --json`,
    {
      startMessage: `Fetching package information for "${targetDependency}"`,
      logOutput: false,
    }
  );

  const npmPackageInfo = JSON.parse(npmPackageInfoRaw);

  if (npmPackageInfo.error) {
    throw new Error(`Could not look up "${targetDependency}" in NPM registry`);
  }

  // Target packages selection
  const isNewDependency = !allDependencies.includes(targetDependency);

  if (flags.nonInteractive && isNewDependency) {
    invariant(
      flags.newInstallsMode,
      `"${targetDependency}" is a first-time install for one or more packages.`,
      "In non-interactive mode you must specify the --new-installs-mode flag (prod|dev|peer) in this situation."
    );
  }

  let targetPackages;

  if (flags.nonInteractive && !flags.packages) {
    const installedPackages = packages
      .filter(
        ({ config: { name } }) =>
          !!(
            dependencyMap[targetDependency] &&
            dependencyMap[targetDependency].packs[name]
          )
      )
      .map(({ config: { name } }) => name);

    invariant(
      installedPackages.length > 0,
      `No packages contain the dependency "${targetDependency}".`,
      "In non-interactive mode you must specify the --packages flag in this situation,",
      "so the script can know which packages install it in."
    );

    targetPackages = installedPackages;
  } else if (flags.packages) {
    targetPackages = packages.map(({ config: { name } }) => name);
  }

  if (!targetPackages) {
    const { targetPackages: promptedTarget } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "targetPackages",
        message: "Select packages to affect:",
        pageSize: 15,
        choices: packages.map(({ config: { name: packageName } }) => {
          if (isNewDependency) {
            return {
              name: packageName,
              value: packageName,
              checked: false,
            };
          }

          const { version, source } =
            dependencyMap[targetDependency].packs[packageName] || {};

          const versionBit = version ? ` (${version})` : "";
          const sourceBit =
            source === "devDependencies" ? chalk.white(" (dev)") : "";

          return {
            name: `${packageName}${versionBit}${sourceBit}`,
            value: packageName,
            checked: !!version,
          };
        }),
      },
    ]);

    targetPackages = promptedTarget;
  }

  // Target version selection
  let targetVersion =
    flags.dependency && parseDependency(flags.dependency).version;

  if (!targetVersion) {
    const npmVersions = npmPackageInfo.versions.reverse();
    const npmDistTags = npmPackageInfo["dist-tags"];

    const highestInstalled =
      !isNewDependency &&
      dependencyMap[targetDependency].versions.sort(semverCompare).pop();

    const availableVersions = [
      ...Object.entries(npmDistTags).map(([tag, version]) => ({
        name: `${version} ${chalk.bold(`#${tag}`)}`,
        value: version,
      })),
      !isNewDependency && {
        name: `${highestInstalled} ${chalk.bold("Highest installed")}`,
        value: highestInstalled,
      },
      ...npmVersions.filter(
        version =>
          version !== highestInstalled &&
          !Object.values(npmDistTags).includes(version)
      ),
    ].filter(Boolean);

    const { targetVersion: promptedTarget } = await inquirer.prompt([
      {
        type: "semverList",
        name: "targetVersion",
        message: "Select version to install:",
        pageSize: 10,
        choices: availableVersions,
      },
    ]);

    targetVersion = promptedTarget;
  }

  perf.start();
  let totalInstalls = 0;

  // Install process
  for (let depName of targetPackages) {
    const existingDependency = dependencyMap[targetDependency];

    let source = "dependencies";

    const dependencyManager = (await fileExists(
      resolve(projectDir, "yarn.lock")
    ))
      ? "yarn"
      : "npm";

    if (existingDependency && existingDependency.packs[depName]) {
      const { version, source: theSource } =
        existingDependency.packs[depName] || {};

      source = theSource;

      if (version === targetVersion) {
        ui.log.write("");
        ui.log.write(`Already installed (${targetVersion})`);
        ui.log.write(chalk.green(`${depName} ✓`));
        ui.log.write("");
        continue;
      }
    } else if (!flags.newInstallsMode) {
      const { targetSource } = await inquirer.prompt([
        {
          type: "list",
          name: "targetSource",
          message: `Select dependency installation type for "${depName}"`,
          pageSize: 3,
          choices: [
            { name: "dependencies" },
            { name: "devDependencies" },
            dependencyManager === "yarn" && { name: "peerDependencies" },
          ].filter(Boolean),
        },
      ]);

      source = targetSource;
    } else {
      source = {
        prod: "dependencies",
        dev: "devDependencies",
        peer: "peerDependencies",
      }[flags.newInstallsMode];
    }

    const { path: packageDir } = packages.find(
      ({ config: { name } }) => name === depName
    );

    const sourceParam = {
      yarn: {
        devDependencies: "--dev",
        peerDependencies: "--peer",
      },
      npm: {
        dependencies: "--save",
        devDependencies: "--save-dev",
      },
    }[dependencyManager][source || "dependencies"];

    const installCmd = (dependencyManager === "yarn"
      ? ["yarn", "add", sourceParam, `${targetDependency}@${targetVersion}`]
      : ["npm", "install", sourceParam, `${targetDependency}@${targetVersion}`]
    ).join(" ");

    await runCommand(`cd ${packageDir} && ${installCmd}`, {
      startMessage: `${chalk.white.bold(depName)}: ${installCmd}`,
      endMessage: chalk.green(`${depName} ✓`),
      logTime: true,
    });

    totalInstalls++;
  }

  if (totalInstalls === 0) process.exit();

  ui.log.write(
    chalk.bold(`Installed ${totalInstalls} packages in ${perf.stop().words}`)
  );

  if (!flags.nonInteractive) {
    const userName = (
      (await runCommand("git config --get github.user", {
        logOutput: false,
      })) ||
      (await runCommand("whoami", { logOutput: false })) ||
      "upgrade"
    )
      .split("\n")
      .shift();

    const {
      shouldCreateGitBranch,
      shouldCreateGitCommit,
      gitBranchName,
      gitCommitMessage,
    } = await inquirer.prompt([
      {
        type: "confirm",
        name: "shouldCreateGitBranch",
        message: "Do you want to create a new git branch for the change?",
      },
      {
        type: "input",
        name: "gitBranchName",
        message: "Enter a name for your branch:",
        when: ({ shouldCreateGitBranch }) => shouldCreateGitBranch,
        default: sanitizeGitBranchName(
          `${userName}/${targetDependency}-${targetVersion}`
        ),
      },
      {
        type: "confirm",
        name: "shouldCreateGitCommit",
        message: "Do you want to create a new git commit for the change?",
      },
      {
        type: "input",
        name: "gitCommitMessage",
        message: "Enter a git commit message:",
        when: ({ shouldCreateGitCommit }) => shouldCreateGitCommit,
        default: `Upgrade dependency: ${targetDependency}@${targetVersion}`,
      },
    ]);

    if (shouldCreateGitBranch) {
      const createCmd = `git checkout -b ${gitBranchName}`;
      await runCommand(`cd ${projectDir} && ${createCmd}`, {
        startMessage: `${chalk.white.bold(projectName)}: ${createCmd}`,
        endMessage: chalk.green(`Branch created ✓`),
      });
    }

    if (shouldCreateGitCommit) {
      const subMessage = targetPackages
        .reduce((prev, depName) => {
          const fromVersion =
            !isNewDependency &&
            dependencyMap[targetDependency].packs[depName].version;

          if (fromVersion === targetVersion) return prev;

          return fromVersion
            ? [...prev, `* ${depName}: ${fromVersion} →  ${targetVersion}`]
            : [...prev, `* ${depName}: ${targetVersion}`];
        }, [])
        .join("\n");

      const createCmd = `git add . && git commit -m '${gitCommitMessage}' -m '${subMessage}'`;
      await runCommand(`cd ${projectDir} && ${createCmd}`, {
        startMessage: `${chalk.white.bold(
          projectName
        )}: git add . && git commit`,
        endMessage: chalk.green(`Commit created ✓`),
        logOutput: false,
      });
    }
  } else {
    process.exit();
  }
};
