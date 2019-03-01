"use strict";
/*
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
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
const logging = require("plylog");
const Generator = require("yeoman-generator");
const github_1 = require("../github/github");
const logger = logging.getLogger('cli.init');
function createGithubGenerator(githubOptions) {
    const githubToken = githubOptions.githubToken;
    const owner = githubOptions.owner;
    const repo = githubOptions.repo;
    const semverRange = githubOptions.semverRange || '*';
    const branch = githubOptions.branch;
    const tag = githubOptions.tag;
    const installDependencies = githubOptions.installDependencies;
    return class GithubGenerator extends Generator {
        constructor(args, options) {
            super(args, options || {});
            this._github = new github_1.Github({ owner, repo, githubToken });
        }
        // This is necessary to prevent an exception in Yeoman when creating
        // storage for generators registered as a stub and used in a folder
        // with a package.json but with no name property.
        // https://github.com/Polymer/polymer-cli/issues/186
        rootGeneratorName() {
            return 'GithubGenerator';
        }
        _writing() {
            return __awaiter(this, void 0, void 0, function* () {
                let codeSource;
                if (branch) {
                    codeSource = yield this._github.getBranch(branch);
                }
                else if (tag) {
                    codeSource = yield this._github.getTag(tag);
                }
                else {
                    logger.info((semverRange === '*') ?
                        `Finding latest release of ${owner}/${repo}` :
                        `Finding latest ${semverRange} release of ${owner}/${repo}`);
                    codeSource = yield this._github.getSemverRelease(semverRange);
                }
                yield this._github.extractReleaseTarball(codeSource.tarball_url, this.destinationRoot());
                this._github.removeUnwantedFiles(this.destinationRoot());
            });
        }
        writing() {
            return __awaiter(this, void 0, void 0, function* () {
                // TODO(usergenic): Cast here to any because the yeoman-generator typings
                // for 2.x are not surfacing the async() method placed onto the Generator
                // in the constructor.
                // tslint:disable-next-line
                const done = this.async();
                this._writing().then(() => done(), (err) => done(err));
            });
        }
        install() {
            this.installDependencies(installDependencies);
        }
    };
}
exports.createGithubGenerator = createGithubGenerator;
//# sourceMappingURL=github.js.map