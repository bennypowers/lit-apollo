"use strict";
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const path = require("path");
const polymer_project_config_1 = require("polymer-project-config");
const sinon = require("sinon");
const polymer_cli_1 = require("../../../polymer-cli");
suite('install', () => {
    const expectedDefaultConfig = new polymer_project_config_1.ProjectConfig({
        extraDependencies: [path.resolve('bower_components/webcomponentsjs/*.js')],
    });
    test('runs using full command name', () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli(['install']);
        const installCommand = cli.commands.get('install');
        const installCommandSpy = sinon.stub(installCommand, 'run');
        yield cli.run();
        chai_1.assert.isOk(installCommandSpy.calledOnce);
        chai_1.assert.deepEqual(installCommandSpy.firstCall.args, [{ offline: false, variants: false }, expectedDefaultConfig]);
    }));
    test('runs using aliased command name', () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli(['i']);
        const installCommand = cli.commands.get('install');
        const installCommandSpy = sinon.stub(installCommand, 'run');
        yield cli.run();
        chai_1.assert.isOk(installCommandSpy.calledOnce);
        chai_1.assert.deepEqual(installCommandSpy.firstCall.args, [{ offline: false, variants: false }, expectedDefaultConfig]);
    }));
    test('runs using aliased command name with argument', () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli(['i', '--variants']);
        const installCommand = cli.commands.get('install');
        const installCommandSpy = sinon.stub(installCommand, 'run');
        yield cli.run();
        chai_1.assert.isOk(installCommandSpy.calledOnce);
        chai_1.assert.deepEqual(installCommandSpy.firstCall.args, [{ offline: false, variants: true }, expectedDefaultConfig]);
    }));
});
//# sourceMappingURL=install_test.js.map