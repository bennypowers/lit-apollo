const { spawn } = require("child_process");
const perf = require("execution-time")();

const ui = require("./ui");

module.exports = async (cmd, options = {}) => {
  ui.logBottom(options.startMessage);
  const proc = spawn(cmd, { shell: true });

  if (options.logOutput !== false) proc.stdout.pipe(ui.log);
  if (options.logTime) perf.start();

  let data = "";
  return new Promise((resolve, reject) => {
    proc.stdout.on("data", d => (data = data + d.toString()));
    proc.stdout.on("end", () => {
      ui.logBottom("");

      if (options.endMessage || options.logTime) {
        const timeLog = options.logTime ? `(${perf.stop().words})` : "";

        const endMessage = options.endMessage || "";

        ui.log.write([endMessage, timeLog].join(" "));
      }

      ui.log.write("");
      resolve(data);
    });
    proc.stdout.on("error", reject);
  });
};
