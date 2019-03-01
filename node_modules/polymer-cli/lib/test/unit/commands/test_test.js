"use strict";
/*
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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
const wct = require("web-component-tester");
const polymer_cli_1 = require("../../../polymer-cli");
suite('test', () => {
    teardown(() => {
        sinon.restore();
    });
    test('--npm flag is passed to WCT and sets the --component-dir flag', () => __awaiter(this, void 0, void 0, function* () {
        const wctCliRunStub = sinon.stub(wct.cli, 'run').returns(Promise.resolve());
        const cli = new polymer_cli_1.PolymerCli(['test', '--npm']);
        yield cli.run();
        const wctArgs = wctCliRunStub.args[0][1];
        chai_1.assert.includeMembers(wctCliRunStub.args[0][1], ['--npm']);
        chai_1.assert.includeMembers(wctArgs, [`--component-dir='node_modules/'`]);
    }));
    test('--component-dir flag overrides the default setting caused by the ' +
        '--npm flag', () => __awaiter(this, void 0, void 0, function* () {
        const wctCliRunStub = sinon.stub(wct.cli, 'run').returns(Promise.resolve());
        const cli = new polymer_cli_1.PolymerCli(['test', '--npm', '--component-dir=path/to/deps/']);
        yield cli.run();
        const wctArgs = wctCliRunStub.args[0][1];
        chai_1.assert.includeMembers(wctArgs, ['--npm']);
        chai_1.assert.includeMembers(wctArgs, [`--component-dir='path/to/deps/'`]);
    }));
    test('--component-dir flag is passed to WCT', () => __awaiter(this, void 0, void 0, function* () {
        const wctCliRunStub = sinon.stub(wct.cli, 'run').returns(Promise.resolve());
        const cli = new polymer_cli_1.PolymerCli(['test', '--component-dir=path/to/deps/']);
        yield cli.run();
        const wctArgs = wctCliRunStub.args[0][1];
        chai_1.assert.isOk(!wctArgs.includes('--npm'));
        chai_1.assert.includeMembers(wctArgs, [`--component-dir='path/to/deps/'`]);
    }));
    test('--module-resolution flag is passed to WCT', () => __awaiter(this, void 0, void 0, function* () {
        const wctCliRunStub = sinon.stub(wct.cli, 'run').returns(Promise.resolve());
        const cli = new polymer_cli_1.PolymerCli(['test', '--module-resolution=none']);
        yield cli.run();
        const wctArgs = wctCliRunStub.args[0][1];
        chai_1.assert.includeMembers(wctArgs, [`--module-resolution=none`]);
    }));
});
//# sourceMappingURL=test_test.js.map