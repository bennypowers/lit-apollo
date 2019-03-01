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
const polyserve = require("polyserve");
const sinon = require("sinon");
const polymer_cli_1 = require("../../../polymer-cli");
suite('serve', () => {
    suite('--npm and --component-dir', () => {
        let startServersStub;
        let getServerUrlsStub;
        setup(() => {
            startServersStub = sinon
                .stub(polyserve, 'startServers')
                // tslint:disable-next-line: no-any
                .returns(Promise.resolve());
            startServersStub.returns({
                kind: 'mainline',
            });
            getServerUrlsStub = sinon
                .stub(polyserve, 'getServerUrls')
                // tslint:disable-next-line: no-any
                .returns(Promise.resolve());
            getServerUrlsStub.returns({
                serverUrl: 'http://applications.example.com/',
                componentUrl: 'http://components.example.com/',
            });
        });
        teardown(() => {
            sinon.restore();
        });
        test('--npm flag is passed to polyserve and sets the --component-dir flag', () => __awaiter(this, void 0, void 0, function* () {
            const cli = new polymer_cli_1.PolymerCli(['serve', '--npm']);
            yield cli.run();
            const serverOptions = startServersStub.args[0][0];
            chai_1.assert.propertyVal(serverOptions, 'npm', true);
            chai_1.assert.propertyVal(serverOptions, 'componentDir', 'node_modules/');
        }));
        test('--component-dir flag overrides the default setting caused by the ' +
            '--npm flag', () => __awaiter(this, void 0, void 0, function* () {
            const cli = new polymer_cli_1.PolymerCli(['serve', '--npm', '--component-dir=path/to/deps/']);
            yield cli.run();
            const serverOptions = startServersStub.args[0][0];
            chai_1.assert.propertyVal(serverOptions, 'npm', true);
            chai_1.assert.propertyVal(serverOptions, 'componentDir', 'path/to/deps/');
        }));
        test('--component-dir flag is passed to polyserve', () => __awaiter(this, void 0, void 0, function* () {
            const cli = new polymer_cli_1.PolymerCli(['serve', '--component-dir=path/to/deps/']);
            yield cli.run();
            const serverOptions = startServersStub.args[0][0];
            chai_1.assert.propertyVal(serverOptions, 'npm', undefined);
            chai_1.assert.propertyVal(serverOptions, 'componentDir', 'path/to/deps/');
        }));
        test('--module-resolution default does not override config', () => __awaiter(this, void 0, void 0, function* () {
            const cli = new polymer_cli_1.PolymerCli(['serve'], { moduleResolution: 'node' });
            yield cli.run();
            const serverOptions = startServersStub.args[0][0];
            chai_1.assert.propertyVal(serverOptions, 'moduleResolution', 'node');
        }));
    });
});
//# sourceMappingURL=serve_test.js.map