const { default: runProgram } = require("./utils/runProgram");
const generateProject = require("./utils/generateProject");
const { resolve } = require("path");
const expect = require("unexpected");

describe("Setting semver prefix for dependency", async () => {
  it("correctly toggles through prefixes using left/right arrow keys", async () => {
    // eslint-disable-next-line
    jest.setTimeout(100000);
    const projectPath = await generateProject({
      name: "project-a",
      packages: [
        { name: "sub-package-a" },
        {
          name: "sub-package-b",
          dependencies: { treediff: "0.1.0" },
        },
        { name: "sub-package-c" },
        { name: "sub-package-d", dependencies: { lodash: "~0.2.0" } },
      ],
    });

    await runProgram(
      projectPath,
      `
        ? Select a dependency to upgrade: (Use arrow keys or type to search)
        ❯ lodash (1 version)
          treediff (1 version)

        >>> input lodash

        ? Select a dependency to upgrade: lodash
        ❯ lodash (1 version)

        >>> input ENTER

        ❯◯ sub-package-a
         ◯ sub-package-b
         ◯ sub-package-c
         ◉ sub-package-d (~0.2.0)

        >>> input ARROW_DOWN
        >>> input ARROW_DOWN
        >>> input ARROW_DOWN

        >>> input ENTER

        ? Select version to install:

        >>> input ARROW_UP
        >>> input ARROW_UP

        ❯ 0.2.0
          0.1.0

        >>> input ARROW_RIGHT

        ❯ ^0.2.0
          0.1.0

        >>> input ARROW_RIGHT

        ❯ ~0.2.0
          0.1.0

        >>> input ARROW_RIGHT

        ❯ 0.2.0
          0.1.0

        >>> input ARROW_LEFT

        ❯ ~0.2.0
          0.1.0

        >>> input ARROW_LEFT

        ❯ ^0.2.0
          0.1.0

        >>> input ARROW_LEFT

        ❯ 0.2.0
          0.1.0

        >>> input ARROW_RIGHT

        ❯ ^0.2.0
          0.1.0

        >>> input ENTER

        ? Do you want to create a new git branch for the change? (Y/n)

        >>> input CTRL+C
       `
    );

    expect(
      require(resolve(projectPath, "packages/sub-package-d/package.json")),
      "to satisfy",
      {
        dependencies: {
          lodash: "^0.2.2",
        },
      }
    );
  });
});
