/*
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
'use strict';
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
const tmp = require("tmp");
const fs = require("fs-extra");
const run_command_1 = require("./run-command");
const util_1 = require("../util");
const fixturePath = path.join(util_1.fixtureDir, 'install-variants');
suite('install-variants', function () {
    const binPath = path.join(__dirname, '../../../bin/polymer.js');
    this.timeout(5 * 1000);
    test('installs variants', () => __awaiter(this, void 0, void 0, function* () {
        const tmpPath = tmp.dirSync().name;
        fs.copySync(fixturePath, tmpPath, {});
        const env = envExcludingBowerVars();
        yield run_command_1.runCommand(binPath, ['install', '--variants', '--offline'], { cwd: tmpPath, env });
        const mainDir = path.join(tmpPath, 'bower_components');
        chai_1.assert.isTrue(fs.statSync(mainDir).isDirectory());
        const variant1Dir = path.join(tmpPath, 'bower_components-variant-1');
        chai_1.assert.isTrue(fs.statSync(variant1Dir).isDirectory());
        const variant2Dir = path.join(tmpPath, 'bower_components-variant-1');
        chai_1.assert.isTrue(fs.statSync(variant2Dir).isDirectory());
    }));
});
/**
 * Constructs a version of process.env with all bower_* keys blanked out.
 *
 * This is to override the bower cache options on travis so that our local
 * cache is used in fixtures/install-variants/bower_cache
 */
function envExcludingBowerVars() {
    const env = {};
    for (const envVar of Object.keys(process.env)) {
        if (!envVar.startsWith('bower_')) {
            env[envVar] = process.env[envVar];
        }
        else {
            env[envVar] = '';
        }
    }
    return env;
}
//# sourceMappingURL=install-variants_test.js.map