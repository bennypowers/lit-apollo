const { default: runProgram } = require("./utils/runProgram");
const generateProject = require("./utils/generateProject");
const expect = require("unexpected");
const { resolve } = require("path");

const projectConfig = {
  name: "project-dedupe-flag",
  packages: [
    {
      name: "sub-package-a",
      dependencies: { lodash: "0.1.0" },
    },
    {
      name: "sub-package-b",
      dependencies: { lodash: "0.2.0", treediff: "0.1.0" },
    },
  ],
};

describe("--dedupe flag", () => {
  it("filters out dependencies with less than different 2 versions installed", async () => {
    // eslint-disable-next-line
    jest.setTimeout(100000);

    const projectPath = await generateProject(projectConfig);

    await runProgram(
      `${projectPath} --dedupe`,
      `
        ? Select a dependency to upgrade: (Use arrow keys or type to search)
        ❯ lodash (2 versions)

        >>> input tree

        ? Select a dependency to upgrade: tree
        ❯ tree [+ADD]

        >>> input CTRL+C
        `
    );
  });

  it("deduplicates dependency version by installing the highest installed version", async () => {
    // eslint-disable-next-line
    jest.setTimeout(100000);

    const projectPath = await generateProject(projectConfig);

    await runProgram(
      `${projectPath} --dedupe`,
      `
        ? Select a dependency to upgrade: (Use arrow keys or type to search)
        ❯ lodash (2 versions)

        >>> input lodash

        ? Select a dependency to upgrade: lodash
        ❯ lodash (2 versions)

        >>> input ENTER

        ❯◉ sub-package-a (0.1.0)
         ◉ sub-package-b (0.2.0)

        >>> input ENTER

        ? Select version to install:

        >>> input ARROW_DOWN
        >>> input ENTER

        Already installed (0.2.0)

        >>> input CTRL+C
        `
    );

    expect(
      require(resolve(projectPath, "packages/sub-package-a/package.json")),
      "to satisfy",
      { dependencies: { lodash: "^0.2.0" } }
    );
  });
});
