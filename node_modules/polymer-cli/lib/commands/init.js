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
const logging = require("plylog");
const logger = logging.getLogger('cli.command.init');
class InitCommand {
    constructor() {
        this.name = 'init';
        this.aliases = [];
        this.description = 'Initializes a Polymer project';
        this.args = [{
                name: 'name',
                description: 'The template name to use to initialize the project',
                type: String,
                defaultOption: true,
            }];
    }
    run(options, _config) {
        return __awaiter(this, void 0, void 0, function* () {
            // Defer dependency loading until needed
            const polymerInit = yield Promise.resolve().then(() => require('../init/init'));
            const templateName = options['name'];
            if (templateName) {
                const subgen = (templateName.indexOf(':') !== -1) ? '' : ':app';
                const generatorName = `polymer-init-${templateName}${subgen}`;
                logger.debug('template name provided', {
                    generator: generatorName,
                    template: templateName,
                });
                return polymerInit.runGenerator(generatorName, options);
            }
            logger.debug('no template name provided, prompting user...');
            return polymerInit.promptGeneratorSelection();
        });
    }
}
exports.InitCommand = InitCommand;
//# sourceMappingURL=init.js.map