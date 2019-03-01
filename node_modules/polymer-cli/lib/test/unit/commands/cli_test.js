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
const path = require("path");
const logging = require("plylog");
const sinon = require("sinon");
const polymer_cli_1 = require("../../../polymer-cli");
const util_1 = require("../../util");
suite('The general CLI', () => {
    test('displays general help when no command is called', () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli([]);
        const output = yield util_1.interceptOutput(() => __awaiter(this, void 0, void 0, function* () {
            yield cli.run();
        }));
        chai_1.assert.include(output, 'Usage: `polymer <command>');
    }));
    let testName = 'displays general help when no command is called with the --help flag';
    test(testName, () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli(['--help']);
        const output = yield util_1.interceptOutput(() => __awaiter(this, void 0, void 0, function* () {
            yield cli.run();
        }));
        chai_1.assert.include(output, 'Usage: `polymer <command>');
    }));
    test('displays general help when unknown command is called', () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli(['THIS_IS_SOME_UNKNOWN_COMMAND']);
        const output = yield util_1.interceptOutput(() => __awaiter(this, void 0, void 0, function* () {
            yield cli.run();
        }));
        chai_1.assert.include(output, 'Usage: `polymer <command>');
    }));
    test('displays command help when called with the --help flag', () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli(['build', '--help']);
        const output = yield util_1.interceptOutput(() => __awaiter(this, void 0, void 0, function* () {
            yield cli.run();
        }));
        chai_1.assert.include(output, 'polymer build');
        chai_1.assert.include(output, 'Command Options');
        chai_1.assert.include(output, '--bundle');
    }));
    test('displays command help when called with the -h flag', () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli(['init', '-h']);
        const output = yield util_1.interceptOutput(() => __awaiter(this, void 0, void 0, function* () {
            yield cli.run();
        }));
        chai_1.assert.include(output, 'polymer init');
        chai_1.assert.include(output, 'Command Options');
        chai_1.assert.include(output, '--name');
    }));
    testName = 'displays version information when called with the --version flag';
    test(testName, () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli(['--version']);
        const output = yield util_1.interceptOutput(() => __awaiter(this, void 0, void 0, function* () {
            yield cli.run();
        }));
        chai_1.assert.match(output, /^\d+\.\d+\.\d+(?:-[\da-z-.]+)?$/m);
    }));
    testName = `sets the appropriate log levels when ` +
        `the --verbose & --quiet flags are used`;
    test(testName, () => {
        new polymer_cli_1.PolymerCli(['help', '--verbose']);
        let logger = logging.getLogger('TEST_LOGGER');
        // tslint:disable-next-line: no-any
        chai_1.assert.equal(logger['level'], 'debug');
        new polymer_cli_1.PolymerCli(['help', '--quiet']);
        logger = logging.getLogger('TEST_LOGGER');
        // tslint:disable-next-line: no-any
        chai_1.assert.equal(logger['level'], 'error');
    });
    test('read config from flags', () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli([
            'build',
            '--root',
            'public-cli',
            '--entrypoint',
            'foo-cli.html',
            '--shell',
            'bar-cli.html',
            '--sources',
            '**/*',
            '--extra-dependencies',
            'bower_components/baz-cli/**/*',
        ]);
        const buildCommand = cli.commands.get('build');
        const buildCommandStub = sinon.stub(buildCommand, 'run').returns(Promise.resolve());
        yield cli.run();
        chai_1.assert.isOk(buildCommandStub.calledOnce);
        const config = buildCommandStub.firstCall.args[1];
        const expectedRoot = path.resolve('public-cli');
        chai_1.assert.equal(config.root, expectedRoot);
        chai_1.assert.equal(config.entrypoint, path.resolve(expectedRoot, 'foo-cli.html'));
        chai_1.assert.equal(config.shell, path.resolve(expectedRoot, 'bar-cli.html'));
        chai_1.assert.deepEqual(config.extraDependencies, [path.resolve(expectedRoot, 'bower_components/baz-cli/**/*')]);
        chai_1.assert.deepEqual(config.sources, [
            path.resolve(expectedRoot, '**/*'),
            path.resolve(expectedRoot, 'foo-cli.html'),
            path.resolve(expectedRoot, 'bar-cli.html'),
        ]);
    }));
    test('flags override default config values', () => __awaiter(this, void 0, void 0, function* () {
        const cli = new polymer_cli_1.PolymerCli([
            'build',
            '--root',
            'public-cli',
            '--entrypoint',
            'foo-cli.html',
            '--extra-dependencies',
            'bower_components/baz-cli/**/*',
        ], {
            root: 'public',
            entrypoint: 'foo.html',
            shell: 'bar.html',
            extraDependencies: ['bower_components/baz/**/*'],
            sources: ['src/**'],
        });
        const buildCommand = cli.commands.get('build');
        const buildCommandStub = sinon.stub(buildCommand, 'run').returns(Promise.resolve());
        yield cli.run();
        chai_1.assert.isOk(buildCommandStub.calledOnce);
        const config = buildCommandStub.firstCall.args[1];
        const expectedRoot = path.resolve('public-cli');
        chai_1.assert.equal(config.root, expectedRoot);
        chai_1.assert.equal(config.entrypoint, path.resolve(expectedRoot, 'foo-cli.html'));
        chai_1.assert.equal(config.shell, path.resolve(expectedRoot, 'bar.html'));
        chai_1.assert.deepEqual(config.extraDependencies, [path.resolve(expectedRoot, 'bower_components/baz-cli/**/*')]);
        chai_1.assert.deepEqual(config.sources, [
            path.resolve(expectedRoot, 'src/**'),
            path.resolve(expectedRoot, 'foo-cli.html'),
            path.resolve(expectedRoot, 'bar.html'),
        ]);
    }));
});
//# sourceMappingURL=cli_test.js.map