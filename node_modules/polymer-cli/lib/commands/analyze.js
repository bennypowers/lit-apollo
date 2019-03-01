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
class AnalyzeCommand {
    constructor() {
        this.name = 'analyze';
        this.aliases = [];
        this.description = 'Writes analysis metadata in JSON format to standard out';
        this.args = [{
                name: 'input',
                alias: 'i',
                description: 'The files to analyze, or none to analyze the current directory as a package',
                defaultOption: true,
                multiple: true,
            }];
    }
    run(options, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { analyze } = yield Promise.resolve().then(() => require('../analyze/analyze'));
            const metadata = yield analyze(config, options.input);
            process.stdout.write(JSON.stringify(metadata, null, 2));
            process.stdout.write('\n');
        });
    }
}
exports.AnalyzeCommand = AnalyzeCommand;
//# sourceMappingURL=analyze.js.map