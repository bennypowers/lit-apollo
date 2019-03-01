const Base = require("inquirer/lib/prompts/base");
const observe = require("inquirer/lib/utils/events");
const Paginator = require("inquirer/lib/utils/paginator");
const cliCursor = require("cli-cursor");
const chalk = require("chalk");

const cycle = (length, currentIndex, backwards) =>
  backwards
    ? currentIndex - 1 < 0
      ? length - 1
      : currentIndex - 1
    : currentIndex + 1 >= length
      ? 0
      : currentIndex + 1;

module.exports = class SemverListPrompt extends Base {
  _run(cb) {
    this.done = cb;
    this.prefixes = ["~", "", "^"];
    this.selectedIndex = 0;
    this.semverPrefix = null;
    this.paginator = new Paginator(this.screen);

    cliCursor.hide();

    const events = observe(this.rl);

    events.line.subscribe(this.onSubmit.bind(this));
    events.keypress.subscribe(({ key, key: { name: keyName } }) => {
      switch (keyName) {
        case "up":
        case "down":
          this.selectedIndex = cycle(
            this.opt.choices.length,
            this.selectedIndex,
            keyName === "up"
          );
          this.semverPrefix = null;
          return this.render();
        case "left":
        case "right":
          this.semverPrefix = this.prefixes[
            cycle(
              this.prefixes.length,
              this.prefixes.indexOf(this.getSemverPrefix()),
              keyName === "left"
            )
          ];
          return this.render();
      }
    });

    this.render();
  }

  getSemverPrefix(value = this.getValue()) {
    return this.prefixes.includes(value.charAt(0)) ? value.charAt(0) : "";
  }

  getValue(choice = this.opt.choices.getChoice(this.selectedIndex)) {
    if (this.semverPrefix === null) return choice.value;

    if (this.getSemverPrefix(choice.value)) {
      return `${this.semverPrefix}${choice.value.substr(1)}`;
    } else {
      return `${this.semverPrefix}${choice.value}`;
    }
  }

  getName(choice = this.opt.choices.getChoice(this.selectedIndex)) {
    if (this.semverPrefix === null) return choice.name;

    if (this.getSemverPrefix(choice.value)) {
      return `${this.semverPrefix}${choice.name.substr(1)}`;
    } else {
      return `${this.semverPrefix}${choice.name}`;
    }
  }

  onSubmit() {
    this.screen.render(
      `\nSelected version: ${chalk.white.bold(this.getValue())}\n`
    );
    cliCursor.show();
    this.screen.done();
    this.done(this.getValue());
  }

  render() {
    let output = this.getQuestion();
    output += chalk`\n  {bold.yellow TIP:} Move {yellow LEFT} and {yellow RIGHT} to change semver-prefix: ~ or ^\n\n`;

    let lines = [];
    this.opt.choices.forEach((choice, idx) => {
      const line =
        this.selectedIndex === idx
          ? chalk.cyan(`❯ ${this.getName(choice)}`)
          : `  ${choice.name}`;

      lines = [...lines, line];
    });

    output += this.paginator.paginate(
      lines.join("\n"),
      this.selectedIndex,
      this.opt.pageSize
    );

    this.screen.render(output);
  }
};
