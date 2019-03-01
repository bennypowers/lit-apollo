"use strict";
/*
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
const fs = require("fs-extra");
const path = require("path");
const sinon = require("sinon");
const stream_1 = require("stream");
const tempMod = require("temp");
const chaiSubset = require("chai-subset");
const github_1 = require("../../../github/github");
const util_1 = require("../../util");
chai_1.use(chaiSubset);
const temp = tempMod.track();
suite('github/github', () => {
    suite('tokenFromFile()', () => {
        test.skip('returns a token from file if that file exists', () => {
            // not currently in use, add tests if put back into use
        });
        test.skip('returns null if token file cannot be read', () => {
            // not currently in use, add tests if put back into use
        });
    });
    suite('extractReleaseTarball()', () => {
        test('extracts a tarball from a github tarball url', () => __awaiter(this, void 0, void 0, function* () {
            const tarballUrl = 'http://foo.com/bar.tar';
            let requestedUrl;
            const mockRequestApi = (options) => {
                requestedUrl = options.url;
                return fs.createReadStream(path.join(util_1.fixtureDir, 'github-test-data/test_tarball.tgz'));
            };
            const github = new github_1.Github({
                owner: 'TEST_OWNER',
                repo: 'TEST_REPO',
                // tslint:disable-next-line: no-any
                requestApi: mockRequestApi,
            });
            const tmpDir = temp.mkdirSync();
            yield github.extractReleaseTarball(tarballUrl, tmpDir);
            chai_1.assert.equal(requestedUrl, tarballUrl);
            chai_1.assert.deepEqual(fs.readdirSync(tmpDir), ['file1.txt']);
        }));
        test('rejects when Github returns a 404 response status code', () => __awaiter(this, void 0, void 0, function* () {
            const mockRequestApi = () => {
                const readStream = new stream_1.PassThrough();
                setTimeout(() => {
                    readStream.emit('response', {
                        statusCode: 404,
                        statusMessage: 'TEST MESSAGE - 404',
                    });
                }, 10);
                return readStream;
            };
            const github = new github_1.Github({
                owner: 'TEST_OWNER',
                repo: 'TEST_REPO',
                // tslint:disable-next-line: no-any
                requestApi: mockRequestApi,
            });
            const tmpDir = temp.mkdirSync();
            const err = yield util_1.invertPromise(github.extractReleaseTarball('http://foo.com/bar.tar', tmpDir));
            chai_1.assert.instanceOf(err, github_1.GithubResponseError);
            chai_1.assert.equal(err.message, '404 fetching http://foo.com/bar.tar - TEST MESSAGE - 404');
        }));
    });
    suite('removeUnwantedFiles()', () => {
        function makeDirStruct(files) {
            const tmpDir = temp.mkdirSync();
            files.forEach((file) => {
                const nodes = file.split('/');
                let tmpPath = tmpDir;
                nodes.forEach((node, index) => {
                    tmpPath = path.join(tmpPath, node);
                    if (fs.existsSync(tmpPath)) {
                        return;
                    }
                    if (index === nodes.length - 1) {
                        fs.writeFileSync(tmpPath, '');
                    }
                    else {
                        fs.mkdirSync(tmpPath);
                    }
                });
            });
            return tmpDir;
        }
        test('removes correct files', () => {
            const tmpDir = makeDirStruct([
                '.gitattributes',
                '.github/CONTRIBUTING',
                '.gitignore',
                '.travis.yml',
                'README',
                'src/base.js',
            ]);
            const github = new github_1.Github({
                owner: 'TEST_OWNER',
                repo: 'TEST_REPO',
            });
            github.removeUnwantedFiles(tmpDir);
            chai_1.assert.deepEqual(fs.readdirSync(tmpDir), ['.gitignore', 'README', 'src']);
            chai_1.assert.deepEqual(fs.readdirSync(path.join(tmpDir, 'src')), ['base.js']);
        });
    });
    suite('getSemverRelease()', () => {
        let listReleasesStub;
        let github;
        const basicReleasesResponse = {
            data: [
                { tag_name: 'v1.0.0' },
                { tag_name: 'v1.1.0' },
                { tag_name: 'v1.2.1' },
                { tag_name: 'v2.0.0' },
                { tag_name: 'v2.0.0-pre.1' },
                { tag_name: 'v2.0.1' },
                { tag_name: 'v2.1.0' },
                { tag_name: 'TAG_NAME_WITHOUT_VERSION' },
            ]
        };
        setup(() => {
            listReleasesStub = sinon.stub();
            github = new github_1.Github({
                owner: 'TEST_OWNER',
                repo: 'TEST_REPO',
                githubApi: {
                    repos: {
                        listReleases: listReleasesStub,
                    },
                },
            });
        });
        test('calls the github API with correct params', () => __awaiter(this, void 0, void 0, function* () {
            listReleasesStub.returns(Promise.resolve(basicReleasesResponse));
            yield github.getSemverRelease('*');
            chai_1.assert.isOk(listReleasesStub.calledWithExactly({
                owner: 'TEST_OWNER',
                repo: 'TEST_REPO',
                per_page: 100,
            }));
        }));
        let testName = 'resolves with latest semver release that matches the range: *';
        test(testName, () => __awaiter(this, void 0, void 0, function* () {
            listReleasesStub.returns(Promise.resolve(basicReleasesResponse));
            const release = yield github.getSemverRelease('*');
            chai_1.assert.containSubset(release, { name: 'v2.1.0' });
        }));
        testName =
            'resolves with latest semver release that matches the range: ^v1.0.0';
        test(testName, () => __awaiter(this, void 0, void 0, function* () {
            listReleasesStub.returns(Promise.resolve(basicReleasesResponse));
            const release = yield github.getSemverRelease('^v1.0.0');
            chai_1.assert.containSubset(release, { name: 'v1.2.1' });
        }));
        testName =
            'resolves with latest semver release that matches the range: ^v2.0.0';
        test(testName, () => __awaiter(this, void 0, void 0, function* () {
            listReleasesStub.returns(Promise.resolve(basicReleasesResponse));
            const release = yield github.getSemverRelease('^v2.0.0');
            chai_1.assert.containSubset(release, { name: 'v2.1.0' });
        }));
        testName = 'rejects with an error if no matching releases are found';
        test(testName, () => __awaiter(this, void 0, void 0, function* () {
            listReleasesStub.returns(Promise.resolve(basicReleasesResponse));
            const err = yield util_1.invertPromise(github.getSemverRelease('^v3.0.0'));
            chai_1.assert.equal(err.message, 'TEST_OWNER/TEST_REPO has no releases matching ^v3.0.0.');
        }));
    });
});
//# sourceMappingURL=github_test.js.map