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
const childProcess = require("child_process");
const fs = require("fs");
const inquirer = require("inquirer");
const sinon = require("sinon");
const tempMod = require("temp");
const YeomanEnvironment = require("yeoman-environment");
const helpers = require("yeoman-test");
const polymerInit = require("../../../init/init");
const util_1 = require("../../util");
const temp = tempMod.track();
const isPlatformWin = /^win/.test(process.platform);
const uname = childProcess.execSync('uname -s').toString();
const isMinGw = !!/^mingw/i.test(uname);
function stripAnsi(str) {
    const ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
    return str.replace(ansiRegex, '');
}
suite('init', () => {
    function createFakeEnv() {
        return {
            getGeneratorsMeta: sinon.stub(),
            run: sinon.stub().yields(),
        };
    }
    teardown(() => {
        sinon.restore();
    });
    suite('runGenerator', () => {
        test('runs the given generator', () => __awaiter(this, void 0, void 0, function* () {
            const GENERATOR_NAME = 'TEST-GENERATOR';
            const yeomanEnv = createFakeEnv();
            yeomanEnv.getGeneratorsMeta.returns({
                [GENERATOR_NAME]: GENERATOR_NAME,
            });
            yield polymerInit.runGenerator(GENERATOR_NAME, { env: yeomanEnv });
            chai_1.assert.isOk(yeomanEnv.run.calledWith(GENERATOR_NAME));
        }));
        test('fails if an unknown generator is requested', () => __awaiter(this, void 0, void 0, function* () {
            const UNKNOWN_GENERATOR_NAME = 'UNKNOWN-GENERATOR';
            const yeomanEnv = createFakeEnv();
            yeomanEnv.getGeneratorsMeta.returns({
                'TEST-GENERATOR': 'TEST-GENERATOR',
            });
            const error = yield util_1.invertPromise(polymerInit.runGenerator(UNKNOWN_GENERATOR_NAME, { env: yeomanEnv }));
            chai_1.assert.equal(error.message, `Template ${UNKNOWN_GENERATOR_NAME} not found`);
        }));
        test('works with the default yeoman environment', () => __awaiter(this, void 0, void 0, function* () {
            // Note: Do not use a fake Yeoman environment in this test so that we get
            // coverage of the case where env isn't specified.
            const UNKNOWN_GENERATOR_NAME = 'UNKNOWN-GENERATOR';
            const error = yield util_1.invertPromise(polymerInit.runGenerator(UNKNOWN_GENERATOR_NAME));
            chai_1.assert.equal(error.message, `Template ${UNKNOWN_GENERATOR_NAME} not found`);
        }));
    });
    suite('promptGeneratorSelection', () => {
        let yeomanEnvMock;
        const GENERATORS = [
            {
                generatorName: 'polymer-init-element:app',
                metaName: 'polymer-init-element',
                shortName: 'element',
                description: 'A blank element template',
                resolved: 'unknown',
            },
            {
                generatorName: 'polymer-init-my-test-app:app',
                metaName: 'polymer-init-my-test-app',
                shortName: 'my-test-app',
                description: 'my test app',
            },
            {
                generatorName: 'polymer-init-polymer-starter-kit-custom-1:app',
                metaName: 'polymer-init-polymer-starter-kit-1',
                shortName: 'polymer-starter-kit-1',
                description: 'PSK 1',
            },
            {
                generatorName: 'polymer-init-polymer-starter-kit-custom-2:app',
                metaName: 'generator-polymer-init-polymer-starter-kit-2',
                shortName: 'polymer-starter-kit-2',
                description: 'PSK 2',
            },
            {
                generatorName: 'polymer-init-custom-build-1:app',
                metaName: 'generator-polymer-init-custom-build-1',
                shortName: 'custom-build-1',
                description: 'custom build 1',
            },
            {
                generatorName: 'polymer-init-custom-build-2:app',
                metaName: 'polymer-init-custom-build-2',
                shortName: 'custom-build-2',
                description: 'custom build 2',
            },
            {
                generatorName: 'polymer-init-custom-build-3:app',
                metaName: 'custom-build-3',
                shortName: 'custom-build-3',
                description: 'custom build 3',
            },
        ];
        setup(() => {
            const generators = {};
            for (const generator of GENERATORS) {
                if (!generator.resolved) {
                    const tmpDir = temp.mkdirSync();
                    const packageJsonPath = `${tmpDir}/package.json`;
                    fs.writeFileSync(packageJsonPath, JSON.stringify({
                        description: generator.description,
                        name: generator.metaName,
                    }));
                    generator.resolved = tmpDir;
                }
                generators[generator.generatorName] = {
                    resolved: generator.resolved,
                    namespace: generator.generatorName,
                };
            }
            yeomanEnvMock = createFakeEnv();
            yeomanEnvMock.getGeneratorsMeta.returns(generators);
        });
        test('works with the default yeoman environment', () => __awaiter(this, void 0, void 0, function* () {
            sinon.stub(inquirer, 'prompt').returns(Promise.resolve({
                foo: 'TEST',
            }));
            // tslint:disable-next-line: no-any
            polymerInit.runGenerator = function () { };
            const error = yield util_1.invertPromise(polymerInit.promptGeneratorSelection());
            chai_1.assert.equal(error.message, 'Template TEST not found');
        }));
        let testName = 'prompts with a list to get generatorName property from user';
        test(testName, () => __awaiter(this, void 0, void 0, function* () {
            const promptStub = sinon.stub(inquirer, 'prompt')
                .returns(Promise.resolve({ foo: 'TEST' }));
            try {
                yield polymerInit.promptGeneratorSelection({ env: yeomanEnvMock });
            }
            catch (error) {
                chai_1.assert.equal(error.message, 'Template TEST not found');
            }
            chai_1.assert.isTrue(promptStub.calledOnce);
            chai_1.assert.equal(promptStub.firstCall.args[0][0].type, 'list');
            chai_1.assert.equal(promptStub.firstCall.args[0][0].message, 'Which starter template would you like to use?');
        }));
        test('prompts with a list of all registered generators', () => __awaiter(this, void 0, void 0, function* () {
            const promptStub = sinon.stub(inquirer, 'prompt')
                .returns(Promise.resolve({ foo: 'TEST' }));
            try {
                yield polymerInit.promptGeneratorSelection({ env: yeomanEnvMock });
            }
            catch (error) {
                chai_1.assert.equal(error.message, 'Template TEST not found');
            }
            const choices = promptStub.firstCall.args[0][0].choices;
            chai_1.assert.equal(choices.length, GENERATORS.length);
            for (const choice of choices) {
                const generator = GENERATORS.find((generator) => generator.generatorName === choice.value);
                chai_1.assert.isDefined(generator, `generator not found: ${choice.value}`);
                chai_1.assert.oneOf(stripAnsi(choice.name), [
                    generator.shortName,
                    `${generator.shortName} - ${generator.description}`,
                ]);
                chai_1.assert.equal(choice.value, generator.generatorName);
                // tslint:disable-next-line: no-any
                chai_1.assert.equal(choice.short, generator.shortName);
            }
        }));
        testName = 'includes user-provided generators in the list when properly ' +
            'installed/registered';
        test(testName, () => __awaiter(this, void 0, void 0, function* () {
            const yeomanEnv = new YeomanEnvironment();
            const promptStub = sinon.stub(inquirer, 'prompt').returns(Promise.resolve({
                foo: 'TEST',
            }));
            helpers.registerDependencies(yeomanEnv, [[
                    // tslint:disable-next-line: no-any
                    function () { },
                    'polymer-init-custom-template:app',
                ]]);
            try {
                yield polymerInit.promptGeneratorSelection({ env: yeomanEnv });
            }
            catch (error) {
                chai_1.assert.equal(error.message, 'Template TEST not found');
            }
            chai_1.assert.isTrue(promptStub.calledOnce);
            const choices = promptStub.firstCall.args[0][0].choices;
            const customGeneratorChoice = choices[choices.length - 1];
            chai_1.assert.equal(stripAnsi(customGeneratorChoice.name), 'custom-template');
            chai_1.assert.equal(customGeneratorChoice.value, 'polymer-init-custom-template:app');
            // tslint:disable-next-line: no-any
            chai_1.assert.equal(customGeneratorChoice.short, 'custom-template');
        }));
        test('prompts the user with a list', () => __awaiter(this, void 0, void 0, function* () {
            const promptStub = sinon.stub(inquirer, 'prompt')
                .returns(Promise.resolve({ foo: 'TEST' }));
            try {
                yield polymerInit.promptGeneratorSelection({ env: yeomanEnvMock });
            }
            catch (error) {
                chai_1.assert.equal(error.message, 'Template TEST not found');
            }
            chai_1.assert.isTrue(promptStub.calledOnce);
            chai_1.assert.equal(promptStub.firstCall.args[0][0].type, 'list');
        }));
        if (isPlatformWin && isMinGw) {
            test('prompts with a rawlist if being used in MinGW shell', () => __awaiter(this, void 0, void 0, function* () {
                const promptStub = sinon.stub(inquirer, 'prompt')
                    .returns(Promise.resolve({ foo: 'TEST' }));
                sinon.stub(childProcess, 'execSync')
                    .withArgs('uname -s')
                    .returns(Buffer.from('mingw'));
                try {
                    yield polymerInit.promptGeneratorSelection({ env: yeomanEnvMock });
                }
                catch (error) {
                    chai_1.assert.equal(error.message, 'Template TEST not found');
                }
                chai_1.assert.isTrue(promptStub.calledOnce);
                chai_1.assert.equal(promptStub.firstCall.args[0][0].type, 'rawlist');
            }));
        }
    });
});
//# sourceMappingURL=init_test.js.map