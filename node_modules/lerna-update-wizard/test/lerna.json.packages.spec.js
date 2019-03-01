const { default: runProgram } = require("./utils/runProgram");
const generateProject = require("./utils/generateProject");
const expect = require("unexpected");
const { resolve } = require("path");

const projectConfig = {
  name: "project-a",
  packages: [
    {
      name: "sub-package-a",
      dependencies: { lodash: "0.1.0" },
      moduleDirName: "myPackages",
    },
  ],
};

describe("lerna.json `packages` configuration", () => {
  describe("when given no lerna.json", () => {
    it("cannot find any packages for the project", async () => {
      // eslint-disable-next-line
      jest.setTimeout(100000);

      const projectPath = await generateProject(projectConfig);

      await runProgram(
        projectPath,
        "No packages found. Is this a Lerna project?"
      );
    });
  });

  describe("when given a single non-standard packages location", () => {
    it("reads and installs correctly from/to that directory", async () => {
      // eslint-disable-next-line
      jest.setTimeout(100000);

      const projectPath = await generateProject({
        ...projectConfig,
        lernaJson: {
          packages: ["myPackages/*"],
        },
      });

      await runProgram(
        projectPath,
        `
        ? Select a dependency to upgrade: (Use arrow keys or type to search)
        ❯ lodash (1 version)

        >>> input ENTER

        ? Select packages to affect: (Press <space> to select, <a> to toggle all, <i> to
        invert selection)
        ❯◉ sub-package-a (0.1.0)

        >>> input ENTER

        ? Select version to install:

        >>> input ARROW_UP
        >>> input ENTER

        ? Do you want to create a new git branch for the change? (Y/n)

        >>> input CTRL+C
        `
      );

      expect(
        require(resolve(projectPath, "myPackages/sub-package-a/package.json")),
        "to satisfy",
        { dependencies: { lodash: "^0.2.0" } }
      );
    });
  });

  describe("when given 3 different `packages` locations", () => {
    it("reads and installs correctly from/to that directory", async () => {
      // eslint-disable-next-line
      jest.setTimeout(100000);

      const projectPath = await generateProject({
        name: "project-multi-packages-dir",
        packages: [
          {
            name: "sub-package-myPackages",
            dependencies: { lodash: "0.1.0" },
            moduleDirName: "myPackages",
          },
          {
            name: "sub-package-foobarbaz",
            dependencies: { lodash: "0.2.0" },
            moduleDirName: "foo/bar/baz",
          },
          {
            name: "sub-package-default",
            dependencies: { treediff: "0.1.0" },
          },
        ],
        lernaJson: {
          packages: ["packages/*", "myPackages/*", "foo/bar/baz/*"],
        },
      });

      await runProgram(
        projectPath,
        `
        ? Select a dependency to upgrade: (Use arrow keys or type to search)
          ❯ lodash (2 versions)
          treediff (1 version)

        >>> input ENTER

        ? Select packages to affect: (Press <space> to select, <a> to toggle all, <i> to
         invert selection)
        ❯◯ sub-package-default
         ◉ sub-package-foobarbaz (0.2.0)
         ◉ sub-package-myPackages (0.1.0)

         >>> input SPACE
         >>> input ENTER

         ? Select version to install:

         >>> input ARROW_UP
         >>> input ENTER

         ❯ dependencies
           devDependencies

         >>> input ENTER

         ? Do you want to create a new git branch for the change? (Y/n)

         >>> input CTRL+C
        `
      );
    });
  });
});
