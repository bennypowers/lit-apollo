"use strict";
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
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
const chai_1 = require("chai");
const polymer_cli_1 = require("../../../polymer-cli");
const util_1 = require("../../util");
suite('help', () => {
    let testName = 'displays help for a specific command when called with that command';
    test(testName, () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli(['help', 'build']);
        const output = yield util_1.interceptOutput(() => __awaiter(this, void 0, void 0, function* () {
            yield cli.run();
        }));
        chai_1.assert.include(output, 'polymer build');
        chai_1.assert.include(output, 'Command Options');
        chai_1.assert.include(output, '--bundle');
    }));
    testName =
        'displays general help when the help command is called with no arguments';
    test(testName, () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli(['help']);
        const output = yield util_1.interceptOutput(() => __awaiter(this, void 0, void 0, function* () {
            yield cli.run();
        }));
        chai_1.assert.include(output, 'Usage: `polymer <command>');
    }));
});
//# sourceMappingURL=help_test.js.map