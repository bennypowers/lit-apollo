const inquirer = require("inquirer");
const ui = new inquirer.ui.BottomBar();

let bottomMessageUpdateId = null;
let bottomMessage = "";

module.exports.logBottom = (message = "") => {
  const chars = "/-\\|";
  let index = 0;

  if (message !== bottomMessage) {
    clearInterval(bottomMessageUpdateId);

    if (message !== "") {
      bottomMessageUpdateId = setInterval(() => {
        if (chars.charAt(index) === "") index = 0;

        ui.updateBottomBar(`${chars.charAt(index++)} ${message}`);
      }, 100);
    } else {
      ui.updateBottomBar("");
    }
  }

  bottomMessage = message;
};

module.exports.log = ui.log;
