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
// Be mindful of adding imports here, as this is on the hot path of all
// commands.
const commandLineArgs = require("command-line-args");
const path_1 = require("path");
const logging = require("plylog");
const polymer_project_config_1 = require("polymer-project-config");
const args_1 = require("./args");
const analyze_1 = require("./commands/analyze");
const build_1 = require("./commands/build");
const help_1 = require("./commands/help");
const init_1 = require("./commands/init");
const install_1 = require("./commands/install");
const lint_1 = require("./commands/lint");
const serve_1 = require("./commands/serve");
const test_1 = require("./commands/test");
const util_1 = require("./util");
const commandLineCommands = require("command-line-commands");
const logger = logging.getLogger('cli.main');
process.on('uncaughtException', (error) => {
    logger.error(`Uncaught exception: ${error}`);
    if (error && error.stack) {
        logger.error(error.stack);
    }
    process.exit(1);
});
process.on('unhandledRejection', (error) => {
    logger.error(`Promise rejection: ${error}`);
    if (error && error.stack) {
        logger.error(error.stack);
    }
    process.exit(1);
});
/**
 * CLI arguments are in "hyphen-case" format, but our configuration is in
 * "lowerCamelCase". This helper function converts the special
 * `command-line-args` data format (with its hyphen-case flags) to an easier to
 *  use options object with lowerCamelCase properties.
 */
// tslint:disable-next-line: no-any Super hacky scary code.
function parseCLIArgs(commandOptions) {
    commandOptions = commandOptions && commandOptions['_all'];
    const parsedOptions = Object.assign({}, commandOptions);
    if (commandOptions['extra-dependencies']) {
        parsedOptions.extraDependencies = commandOptions['extra-dependencies'];
    }
    if (commandOptions.fragment) {
        parsedOptions.fragments = commandOptions.fragment;
    }
    return parsedOptions;
}
/**
 * Shallowly copies an object, converting keys from dash-case to camelCase.
 */
function objectDashToCamelCase(input) {
    const output = {};
    for (const key of Object.keys(input)) {
        output[util_1.dashToCamelCase(key)] = input[key];
    }
    return output;
}
class PolymerCli {
    constructor(args, configOptions) {
        this.commands = new Map();
        // If the "--quiet"/"-q" flag is ever present, set our global logging
        // to quiet mode. Also set the level on the logger we've already created.
        if (args.indexOf('--quiet') > -1 || args.indexOf('-q') > -1) {
            logging.setQuiet();
        }
        // If the "--verbose"/"-v" flag is ever present, set our global logging
        // to verbose mode. Also set the level on the logger we've already created.
        if (args.indexOf('--verbose') > -1 || args.indexOf('-v') > -1) {
            logging.setVerbose();
        }
        this.args = args;
        logger.debug('got args:', { args: args });
        if (typeof configOptions !== 'undefined') {
            this.defaultConfigOptions = configOptions;
            logger.debug('got default config from constructor argument:', { config: this.defaultConfigOptions });
        }
        else {
            this.defaultConfigOptions =
                polymer_project_config_1.ProjectConfig.loadOptionsFromFile('polymer.json');
            if (this.defaultConfigOptions) {
                logger.debug('got default config from polymer.json file:', { config: this.defaultConfigOptions });
            }
            else {
                logger.debug('no polymer.json file found, no config loaded');
            }
        }
        // This is a quick fix to make sure that "webcomponentsjs" files are
        // included in every build, since some are imported dynamically in a way
        // that our analyzer cannot detect.
        // TODO(fks) 03-07-2017: Remove/refactor when we have a better plan for
        // support (either here or inside of polymer-project-config).
        this.defaultConfigOptions = this.defaultConfigOptions || {};
        this.defaultConfigOptions.extraDependencies =
            this.defaultConfigOptions.extraDependencies || [];
        this.defaultConfigOptions.extraDependencies.unshift(`bower_components${path_1.sep}webcomponentsjs${path_1.sep}*.js`);
        this.addCommand(new analyze_1.AnalyzeCommand());
        this.addCommand(new build_1.BuildCommand());
        this.addCommand(new help_1.HelpCommand(this.commands));
        this.addCommand(new init_1.InitCommand());
        this.addCommand(new install_1.InstallCommand());
        this.addCommand(new lint_1.LintCommand());
        this.addCommand(new serve_1.ServeCommand());
        this.addCommand(new test_1.TestCommand());
    }
    addCommand(command) {
        logger.debug('adding command', command.name);
        this.commands.set(command.name, command);
        command.aliases.forEach((alias) => {
            logger.debug('adding alias', alias);
            this.commands.set(alias, command);
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const helpCommand = this.commands.get('help');
            const commandNames = Array.from(this.commands.keys());
            let parsedArgs;
            logger.debug('running...');
            // If the "--version" flag is ever present, just print
            // the current version. Useful for globally installed CLIs.
            if (this.args.indexOf('--version') > -1) {
                console.log(require('../package.json').version);
                return Promise.resolve();
            }
            try {
                parsedArgs = commandLineCommands(commandNames, this.args);
            }
            catch (error) {
                // Polymer CLI needs a valid command name to do anything. If the given
                // command is invalid, run the generalized help command with default
                // config. This should print the general usage information.
                if (error.name === 'INVALID_COMMAND') {
                    if (error.command) {
                        logger.warn(`'${error.command}' is not an available command.`);
                    }
                    return helpCommand.run({ command: error.command }, new polymer_project_config_1.ProjectConfig(this.defaultConfigOptions));
                }
                // If an unexpected error occurred, propagate it
                throw error;
            }
            const commandName = parsedArgs.command;
            const commandArgs = parsedArgs.argv;
            const command = this.commands.get(commandName);
            if (command == null) {
                throw new TypeError('command is null');
            }
            logger.debug(`command '${commandName}' found, parsing command args:`, { args: commandArgs });
            const commandDefinitions = args_1.mergeArguments([command.args, args_1.globalArguments]);
            const commandOptionsRaw = commandLineArgs(commandDefinitions, { argv: commandArgs });
            const commandOptions = parseCLIArgs(commandOptionsRaw);
            logger.debug(`command options parsed from args:`, commandOptions);
            const mergedConfigOptions = Object.assign({}, this.defaultConfigOptions, objectDashToCamelCase(commandOptions));
            logger.debug(`final config options:`, mergedConfigOptions);
            const config = new polymer_project_config_1.ProjectConfig(mergedConfigOptions);
            logger.debug(`final project configuration generated:`, config);
            // Help is a special argument for displaying help for the given command.
            // If found, run the help command instead, with the given command name as
            // an option.
            if (commandOptions['help']) {
                logger.debug(`'--help' option found, running 'help' for given command...`);
                return helpCommand.run({ command: commandName }, config);
            }
            logger.debug('Running command...');
            return command.run(commandOptions, config);
        });
    }
}
exports.PolymerCli = PolymerCli;
//# sourceMappingURL=polymer-cli.js.map