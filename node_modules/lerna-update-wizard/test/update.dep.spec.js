const { default: runProgram } = require("./utils/runProgram");
const generateProject = require("./utils/generateProject");

describe("Update dependency", async () => {
  describe("dep already is installed in all selected packages", () => {
    it("updates", async () => {
      // eslint-disable-next-line
      jest.setTimeout(100000);

      const projectPath = await generateProject({
        name: "project-a",
        packages: [
          { name: "sub-package-a" },
          {
            name: "sub-package-b",
            dependencies: { lodash: "0.1.0" },
          },
          { name: "sub-package-c" },
          { name: "sub-package-d", dependencies: { lodash: "0.2.0" } },
        ],
      });

      await runProgram(
        projectPath,
        `
        ? Select a dependency to upgrade: (Use arrow keys or type to search)
        ❯ lodash (2 versions)

        >>> input lodash

        ? Select a dependency to upgrade: lodash
        ❯ lodash (2 versions)

        >>> input ENTER

        / Fetching package information for "lodash"

        >>> wait

        ? Select packages to affect: (Press <space> to select, <a> to toggle all, <i> to
        invert selection)
        ❯◯ sub-package-a
        ◉ sub-package-b (0.1.0)
        ◯ sub-package-c
        ◉ sub-package-d (0.2.0)

        >>> input ARROW_UP

         ◯ sub-package-a
         ◉ sub-package-b (0.1.0)
         ◯ sub-package-c
        ❯◉ sub-package-d (0.2.0)

        >>> input ENTER

        ? Select version to install:

        >>> input ARROW_UP
        >>> input ARROW_UP
        >>> input ARROW_UP

        ❯ 0.2.2
        0.2.1
        0.1.0

        >>> input ENTER

        ? Do you want to create a new git branch for the change? (Y/n)

        >>> input n
        >>> input ENTER

        ? Do you want to create a new git commit for the change? (Y/n)

        >>> input n
        >>> input ENTER
        `
      );
    });
  });

  describe("dep is new to one of the selected packages", () => {
    it("prompts user about install-type and installs/updates", async () => {
      // eslint-disable-next-line
      jest.setTimeout(100000);

      const projectPath = await generateProject({
        name: "project-b",
        packages: [
          { name: "sub-package-a" },
          {
            name: "sub-package-b",
            dependencies: { lodash: "0.1.0" },
          },
          { name: "sub-package-c" },
          { name: "sub-package-d", dependencies: { lodash: "0.2.0" } },
        ],
      });

      await runProgram(
        projectPath,
        `
        ? Select a dependency to upgrade: (Use arrow keys or type to search)

        >>> input lodash

        ❯ lodash (2 versions)

        >>> input ENTER

        ❯◯ sub-package-a
        ◉ sub-package-b (0.1.0)
        ◯ sub-package-c
        ◉ sub-package-d (0.2.0)

        >>> input ARROW_UP
        >>> input ARROW_UP
        >>> input SPACE

        ◯ sub-package-a
        ◉ sub-package-b (0.1.0)
        ❯◉ sub-package-c
        ◉ sub-package-d (0.2.0)

        >>> input ENTER

        ? Select version to install:

        >>> input ARROW_UP
        >>> input ARROW_UP
        >>> input ARROW_UP

        ❯ 0.2.2

        >>> input ENTER

        ❯ dependencies
          devDependencies

        >>> input ARROW_UP

        ❯ devDependencies

        >>> input ENTER

        sub-package-c: npm install --save-dev lodash@0.2.2

        >>> wait

        ? Do you want to create a new git branch for the change? (Y/n)

        >>> input CTRL+C
        `
      );
    });
  });
});
