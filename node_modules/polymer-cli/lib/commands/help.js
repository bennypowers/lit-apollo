"use strict";
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Be careful with these imports. As many as possible should be dynamic imports
// in the run method in order to minimize startup time from loading unused code.
const chalk = require("chalk");
const commandLineUsage = require("command-line-usage");
const logging = require("plylog");
const args_1 = require("../args");
const logger = logging.getLogger('cli.command.help');
const b = chalk.blue;
const m = chalk.magenta;
const CLI_TITLE = chalk.bold.underline('Polymer-CLI');
const CLI_DESCRIPTION = 'The multi-tool for Polymer projects';
const CLI_USAGE = 'Usage: \`polymer <command> [options ...]\`';
const HELP_HEADER = `
   ${b('/\\\\˜˜/')}   ${m('/\\\\˜˜/')}${b('\\\\')}
  ${b('/__\\\\/')}   ${m('/__\\\\/')}${b('__\\\\')}    ${CLI_TITLE}
 ${b('/\\\\  /')}   ${m('/\\\\  /')}${b('\\\\  /\\\\')}
${b('/__\\\\/')}   ${m('/__\\\\/')}  ${b('\\\\/__\\\\')}  ${CLI_DESCRIPTION}
${b('\\\\  /\\\\')}  ${m('/\\\\  /')}   ${b('/\\\\  /')}
 ${b('\\\\/__\\\\')}${m('/__\\\\/')}   ${b('/__\\\\/')}   ${CLI_USAGE}
  ${b('\\\\')}  ${m('/\\\\  /')}   ${b('/\\\\  /')}
   ${b('\\\\')}${m('/__\\\\/')}   ${b('/__\\\\/')}
`;
class HelpCommand {
    constructor(commands) {
        this.name = 'help';
        this.aliases = [];
        this.description = 'Shows this help message, or help for a specific command';
        this.args = [{
                name: 'command',
                description: 'The command to display help for',
                defaultOption: true,
            }];
        this.commands = new Map();
        this.commands = commands;
    }
    generateGeneralUsage() {
        return commandLineUsage([
            {
                content: HELP_HEADER,
                raw: true,
            },
            {
                header: 'Available Commands',
                content: Array.from(new Set(this.commands.values())).map((command) => {
                    return { name: command.name, summary: command.description };
                }),
            },
            { header: 'Global Options', optionList: args_1.globalArguments },
            {
                content: 'Run `polymer help <command>` for help with a specific command.',
                raw: true,
            }
        ]);
    }
    generateCommandUsage(command, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const extraUsageGroups = command.extraUsageGroups ? yield command.extraUsageGroups(config) : [];
            const usageGroups = [
                {
                    header: `polymer ${command.name}`,
                    content: command.description,
                },
                { header: 'Command Options', optionList: command.args },
                { header: 'Global Options', optionList: args_1.globalArguments },
            ];
            if (command.aliases.length > 0) {
                usageGroups.splice(1, 0, { header: 'Alias(es)', content: command.aliases });
            }
            return commandLineUsage(usageGroups.concat(extraUsageGroups));
        });
    }
    run(options, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandName = options['command'];
            if (!commandName) {
                logger.debug('no command given, printing general help...', { options: options });
                console.log(this.generateGeneralUsage());
                return;
            }
            const command = this.commands.get(commandName);
            if (!command) {
                logger.error(`'${commandName}' is not an available command.`);
                console.log(this.generateGeneralUsage());
                return;
            }
            logger.debug(`printing help for command '${commandName}'...`);
            console.log(yield this.generateCommandUsage(command, config));
        });
    }
}
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=help.js.map