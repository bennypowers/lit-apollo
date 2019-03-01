const { default: runProgram } = require("./utils/runProgram");
const generateProject = require("./utils/generateProject");
const fileExists = require("../src/utils/fileExists");
const { resolve } = require("path");
const expect = require("unexpected");

describe("Adding new dependency", async () => {
  it("correctly installs a new version", async () => {
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
        { name: "sub-package-d", dependencies: { lodash: "0.2.0" } },
      ],
    });

    await runProgram(
      projectPath,
      `
        ? Select a dependency to upgrade: (Use arrow keys or type to search)
        ❯ lodash (1 version)
          treediff (1 version)

        >>> input tree

        ? Select a dependency to upgrade: tree
        ❯ treediff (1 version)
          tree [+ADD]

        >>> input BACKSPACE
        >>> input BACKSPACE
        >>> input BACKSPACE
        >>> input BACKSPACE

        >>> input promise-react-component

        ❯ promise-react-component [+ADD]

        >>> input ENTER

        ❯◯ sub-package-a
         ◯ sub-package-b
         ◯ sub-package-c
         ◯ sub-package-d

        >>> input ARROW_DOWN
        >>> input ARROW_DOWN
        >>> input SPACE

         ◯ sub-package-a
         ◯ sub-package-b
        ❯◉ sub-package-c
         ◯ sub-package-d

        >>> input ENTER

        >>> input ARROW_UP
        >>> input ARROW_UP

        ❯ 0.0.2
          0.0.1

        >>> input ENTER

        ? Select dependency installation type for "sub-package-c" (Use arrow keys)
        ❯ dependencies
          devDependencies

        >>> input ENTER

        ? Do you want to create a new git branch for the change? (Y/n)

        >>> input CTRL+C
       `
    );

    expect(
      await fileExists(
        resolve(
          projectPath,
          "packages/sub-package-c/node_modules/promise-react-component/package.json"
        )
      ),
      "to be true"
    );
  });

  describe("non-interactive", () => {
    it("Adds the dependency via the --dependency flag", async () => {
      // eslint-disable-next-line
      jest.setTimeout(100000);

      const projectPath = await generateProject({
        name: "project-add-dependency-non-interactive",
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
        ❯◯ sub-package-a
         ◯ sub-package-b
         ◯ sub-package-c
         ◯ sub-package-d

        >>> input SPACE

        ❯◉ sub-package-a

        >>> input ENTER

        Select dependency installation type for "sub-package-a"

        >>> input ENTER

        ? Do you want to create a new git branch for the change? (Y/n)

        >>> input CTRL+C
        `,
        {
          flags: "--dependency promise-react-component@0.0.2",
        }
      );

      expect(
        await fileExists(
          resolve(
            projectPath,
            "packages/sub-package-a/node_modules/promise-react-component/package.json"
          )
        ),
        "to be true"
      );
    });
  });
});
