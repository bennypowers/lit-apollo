const { default: runProgram } = require("./utils/runProgram");
const generateProject = require("./utils/generateProject");
const expect = require("unexpected");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

expect.addAssertion(
  "<string> when run <assertion>",
  async (expect, cmd, assertion, compare) => {
    const result = await exec(cmd);
    return result.stderr
      ? expect.fail(new Error(`Command errored: ${result.sdterr}`))
      : expect(result.stdout.trim(), assertion, compare);
  }
);

describe("Git features", async () => {
  it("correctly adds git commit and branch", async () => {
    // eslint-disable-next-line
    jest.setTimeout(100000);
    const projectPath = await generateProject({
      name: "project-a",
      git: true,
      packages: [
        { name: "sub-package-a" },
        {
          name: "sub-package-b",
          dependencies: { treediff: "0.1.0" },
        },
        { name: "sub-package-c" },
        { name: "sub-package-d", dependencies: { lodash: "0.2.0" } },
      ],
    });

    await runProgram(
      projectPath,
      `
        ? Select a dependency to upgrade: (Use arrow keys or type to search)
        ❯ lodash (1 version)
          treediff (1 version)

        >>> input ENTER

        ? Select packages to affect:

        >>> input ENTER

        ? Select version to install:

        >>> input ARROW_UP
        >>> input ENTER

        ? Do you want to create a new git branch for the change? (Y/n)

        >>> input ENTER

        ? Enter a name for your branch:

        >>> input my-upgrade-branch
        >>> input ENTER

        ? Do you want to create a new git commit for the change? (Y/n)

        >>> input ENTER

        ? Enter a git commit message: (Upgrade dependency: lodash@0.1.0)

        >>> input ENTER

        Commit created ✓
       `
    );

    await expect(
      `cd ${projectPath} && git branch | grep "* my-upgrade-branch" | cut -d ' ' -f2`,
      "when run",
      "to equal",
      "my-upgrade-branch"
    );

    await expect(
      `cd ${projectPath} && git log | sed '5q;d'`,
      "when run",
      "to equal",
      "Upgrade dependency: lodash@0.1.0"
    );

    await expect(
      `cd ${projectPath} && git log | sed '7q;d'`,
      "when run",
      "to equal",
      "* sub-package-d: 0.2.0 →  0.1.0"
    );
  });
});
