"use strict";
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const logging = require("plylog");
const updateNotifier = require("update-notifier");
const polymer_cli_1 = require("./polymer-cli");
const packageJson = require('../package.json');
const logger = logging.getLogger('cli.main');
// Update Notifier: Asynchronously check for package updates and, if needed,
// notify on the next time the CLI is run.
// See https://github.com/yeoman/update-notifier#how for info on how this works.
updateNotifier({ pkg: packageJson }).notify();
(() => __awaiter(this, void 0, void 0, function* () {
    const args = process.argv.slice(2);
    const cli = new polymer_cli_1.PolymerCli(args);
    try {
        const result = yield cli.run();
        if (result && result.constructor &&
            result.constructor.name === 'CommandResult') {
            process.exit(result.exitCode);
        }
    }
    catch (err) {
        logger.error('cli runtime exception: ' + err);
        if (err.stack) {
            logger.error(err.stack);
        }
        process.exit(1);
    }
}))();
//# sourceMappingURL=run.js.map