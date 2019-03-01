/*
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const mz_1 = require("mz");
const fsExtra = require("fs-extra");
const tmp = require("tmp");
const run_command_1 = require("./run-command");
const util_1 = require("../util");
tmp.setGracefulCleanup();
suite('polymer build', function () {
    const binPath = path.join(__dirname, '../../../bin/polymer.js');
    this.timeout(15 * 1000);
    test('handles a simple correct case', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'build-simple', 'source'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build'], { cwd: tmpDir.name });
        assertDirsEqual(path.join(tmpDir.name, 'build'), path.join(util_1.fixtureDir, 'build-simple', 'expected'));
    }));
    test('handles a CLI preset', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'build-with-preset', 'source'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build', '--preset', 'es5-bundled'], {
            cwd: tmpDir.name,
        });
        assertDirsEqual(path.join(tmpDir.name, 'build'), path.join(util_1.fixtureDir, 'build-with-preset', 'expected'));
    }));
    test('handles equivalent of the CLI preset', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'build-with-preset', 'source'), tmpDir.name);
        yield run_command_1.runCommand(binPath, [
            'build',
            '--add-service-worker',
            '--bundle',
            '--css-minify',
            '--html-minify',
            '--js-compile',
            '--js-minify'
        ], { cwd: tmpDir.name });
        assertDirsEqual(path.join(tmpDir.name, 'build/default'), path.join(util_1.fixtureDir, 'build-with-preset', 'expected/es5-bundled'));
    }));
    test('handled (default) bundle all into the entrypoint', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'fragment-variations', 'source'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build', '--bundle'], {
            cwd: tmpDir.name,
        });
        assertDirsEqual(path.join(tmpDir.name, 'build/default'), path.join(util_1.fixtureDir, 'fragment-variations', 'expected-default', 'default'));
    }));
    test('handled bundle into fragment a', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'fragment-variations', 'source'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build', '--bundle', '--fragment', 'a.html'], {
            cwd: tmpDir.name,
        });
        assertDirsEqual(path.join(tmpDir.name, 'build/default'), path.join(util_1.fixtureDir, 'fragment-variations', 'expected-fragment-a', 'default'));
    }));
    test('handled bundle into fragment a and b', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'fragment-variations', 'source'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build', '--bundle', '--fragment', 'a.html', '--fragment', 'b.html'], { cwd: tmpDir.name });
        assertDirsEqual(path.join(tmpDir.name, 'build/default'), path.join(util_1.fixtureDir, 'fragment-variations', 'expected-fragment-b', 'default'));
    }));
    test('handles polymer 1.x project bundler defaults', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'polymer-1-project', 'source'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build', '--bundle'], { cwd: tmpDir.name });
        assertDirsEqual(path.join(tmpDir.name, 'build/default'), path.join(util_1.fixtureDir, 'polymer-1-project', 'expected/default'));
    }));
    test('handles polymer 2.x project bundler defaults', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'polymer-2-project', 'source'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build', '--bundle'], { cwd: tmpDir.name });
        assertDirsEqual(path.join(tmpDir.name, 'build/default'), path.join(util_1.fixtureDir, 'polymer-2-project', 'expected/default'));
    }));
    test('handles polymer 2.x push manifest', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'polymer-2-project', 'source'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build', '--name=push', '--add-push-manifest'], {
            cwd: tmpDir.name
        });
        assertDirsEqual(path.join(tmpDir.name, 'build/push'), path.join(util_1.fixtureDir, 'polymer-2-project', 'expected/push'));
    }));
    test('handles bundle tagged-template literals in ES5', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'build-with-tagged-template-literals', 'source'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build'], {
            cwd: tmpDir.name,
        });
        const filename = path.join(tmpDir.name, 'build', 'es5-bundled', 'my-app.html');
        const contents = mz_1.fs.readFileSync(filename, 'utf-8');
        // assert contents contain _templateObject with UUID suffix
        chai_1.assert.match(contents, /_templateObject\d*_[A-Fa-f0-9]+\s*=/g, 'build output does not contain modified _templateObject names');
        // assert contents don't contain unmodified "_templateObject" variable
        chai_1.assert.notMatch(contents, /_templateObject\d*\s*=/g, 'build output contains unmodified _templateObject names');
    }));
    test('--npm finds dependencies in "node_modules/"', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'element-with-npm-deps'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build', '--npm'], { cwd: tmpDir.name });
    }));
    const testName = '--components-dir finds dependencies in the specified directory';
    test.skip(testName, () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'element-with-other-deps'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build', '--component-dir=path/to/deps/'], {
            cwd: tmpDir.name
        });
    }));
    test('module-based project builds with various configs', () => __awaiter(this, void 0, void 0, function* () {
        const tmpDir = tmp.dirSync();
        copyDir(path.join(util_1.fixtureDir, 'build-modules', 'source'), tmpDir.name);
        yield run_command_1.runCommand(binPath, ['build'], { cwd: tmpDir.name });
        assertDirsEqual(path.join(tmpDir.name, 'build'), path.join(util_1.fixtureDir, 'build-modules', 'expected'));
    }));
});
function copyDir(fromDir, toDir) {
    fsExtra.copy(fromDir, toDir);
}
function assertDirsEqual(actual, expected, basedir = actual) {
    if (process.env['UPDATE_POLYMER_CLI_GOLDENS']) {
        fsExtra.emptyDirSync(expected);
        fsExtra.copySync(actual, expected);
        throw new Error('Goldens updated, test failing for your saftey.');
    }
    const actualNames = mz_1.fs.readdirSync(actual).sort();
    const expectedNames = mz_1.fs.readdirSync(expected).sort();
    chai_1.assert.deepEqual(actualNames, expectedNames, `expected files in directory ${path.relative(basedir, actual)}`);
    for (const fn of actualNames) {
        const subActual = path.join(actual, fn);
        const subExpected = path.join(expected, fn);
        const stat = mz_1.fs.statSync(subActual);
        if (stat.isDirectory()) {
            assertDirsEqual(subActual, subExpected, basedir);
        }
        else {
            const actualContents = mz_1.fs.readFileSync(subActual, 'utf-8').trim();
            const expectedContents = mz_1.fs.readFileSync(subExpected, 'utf-8').trim();
            chai_1.assert.deepEqual(actualContents, expectedContents, `expected contents of ${path.relative(basedir, subActual)}`);
        }
    }
}
//# sourceMappingURL=build_test.js.map