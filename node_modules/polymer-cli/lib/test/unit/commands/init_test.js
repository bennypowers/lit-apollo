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
const sinon = require("sinon");
const polymerInit = require("../../../init/init");
const polymer_cli_1 = require("../../../polymer-cli");
suite('init', () => {
    teardown(() => {
        sinon.restore();
    });
    test('runs the given generator when name argument is provided', () => __awaiter(this, void 0, void 0, function* () {
        const runGeneratorStub = sinon.stub(polymerInit, 'runGenerator').returns(Promise.resolve());
        const cli = new polymer_cli_1.PolymerCli(['init', 'shop']);
        yield cli.run();
        chai_1.assert.isOk(runGeneratorStub.calledOnce);
        chai_1.assert.isOk(runGeneratorStub.calledWith(`polymer-init-shop:app`, {
            name: 'shop',
        }));
    }));
    const testName = 'prompts the user to select a generator when no argument is provided';
    test(testName, () => __awaiter(this, void 0, void 0, function* () {
        const promptSelectionStub = sinon.stub(polymerInit, 'promptGeneratorSelection')
            .returns(Promise.resolve());
        const cli = new polymer_cli_1.PolymerCli(['init']);
        yield cli.run();
        chai_1.assert.isOk(promptSelectionStub.calledOnce);
    }));
});
//# sourceMappingURL=init_test.js.map