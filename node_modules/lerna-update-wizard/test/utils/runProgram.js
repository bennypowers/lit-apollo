const chalk = require("chalk");
const { streamWrite } = require("@rauschma/stringio");
const fs = require("fs-extra");
const sequenceFromString = require("./sequenceFromString");
const { spawn } = require("child_process");

const { scan: liveScan } = require("./liveScan");

// From https://www.novell.com/documentation/extend5/Docs/help/Composer/books/TelnetAppendixB.html
const keys = {
  ARROW_UP: "\u001b[A",
  ARROW_DOWN: "\u001b[B",
  ARROW_RIGHT: "\u001b[C",
  ARROW_LEFT: "\u001b[D",
  ENTER: "\n",
  "CTRL+C": "\u0003",
  SPACE: " ",
  BACKSPACE: "\u0008",
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

let scanner;

const run = (proc, { type, value, maxWait = 8 }, onStdOut) =>
  new Promise(async (resolve, reject) => {
    if (!proc) return resolve();

    proc.stdout.removeAllListeners();

    proc.stdout.on("data", bufferData => {
      const data = bufferData.toString();
      onStdOut && onStdOut(data);
      scanner && scanner.feed(data);
    });

    switch (type) {
      case "wait":
        return resolve(proc);
      case "find":
        const lastBuffer = scanner && scanner.getBuffer();

        scanner = liveScan({
          timeout: maxWait * 1000,
          target: value,
          onFind: ({ matchContext, matchTarget }) => {
            console.info(
              [
                chalk.green.dim(matchContext),
                chalk.green.bold(matchTarget),
              ].join("\n")
            );

            resolve(proc);
          },
          onTimeout: ({ targetBlob, bufferBlob }) => {
            console.info(
              [
                chalk.bold.red("Did not find:"),
                chalk.yellow(targetBlob),
                chalk.bold.red("\nInstead found:"),
                chalk.yellow(bufferBlob),
                chalk.bold.red(`\n\n(After waiting ${maxWait} seconds)`),
              ].join("\n")
            );
            reject(new Error("Timeout error"));
          },
        });

        lastBuffer && scanner.feed(lastBuffer);

        break;
      case "input":
        const sendInput = async data => {
          console.info(chalk.blue(`Input: ${data}`));
          streamWrite(proc.stdin, keys[data] || data);
          await delay(250); // Simulate natural user input
        };

        const sendInputs = async inputs => {
          for (const input of inputs) {
            await sendInput(input);
          }
        };

        await (Array.isArray(value) ? sendInputs(value) : sendInput(value));
        resolve(proc);
        break;
    }

    proc.stdout.on("end", async () => {
      await delay(maxWait * 1000);
      resolve();
    });
  });

module.exports.run = run;

module.exports.default = (
  projectPath,
  inputSequence,
  { log = !!process.env.CI || !!process.env.DEBUG, flags = "" } = {}
) => {
  const program =
    typeof inputSequence === "string"
      ? sequenceFromString(inputSequence)
      : inputSequence;

  const [initial, ...sequences] = program;

  log && console.info("Running program", JSON.stringify(program, null, 2));

  const cmd = `./bin/lernaupdate${flags && ` ${flags}`} ${projectPath}`;
  const proc = spawn(cmd, { shell: true });

  const logFilePath = `./tmp/test-log.txt`;

  fs.ensureFileSync(logFilePath);

  console.info(`${chalk.white.bold(
    "Running command:"
  )} ${cmd}\n${chalk.bold.white(
    "Log output:"
  )}      ${`tail -f ${logFilePath} | sed 's/\\n/\\n/g'`}
  `);

  const onStdOut = content => {
    log && console.info(chalk.red(content));
    fs.appendFileSync(logFilePath, content);
  };

  return sequences.reduce(
    (prev, config, index) => prev.then(proc => run(proc, config, onStdOut)),
    run(proc, initial, onStdOut)
  );
};
