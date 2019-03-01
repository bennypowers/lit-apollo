"use strict";
/**
 * @license
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
const bower_json_1 = require("bower-json");
const child_process = require("child_process");
const path = require("path");
const logging = require("plylog");
const defaultBowerConfig = require("bower/lib/config");
const BowerLogger = require("bower-logger");
const StandardRenderer = require("bower/lib/renderers/StandardRenderer");
const BowerProject = require("bower/lib/core/Project");
const logger = logging.getLogger('cli.install');
function exec(command, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            child_process.exec(command, opts, (err, stdout, stderr) => {
                err ? reject(err) : resolve([stdout, stderr]);
            });
        });
    });
}
function install(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (options && options.npm) {
            return npmInstall();
        }
        // default to false
        const offline = options == null ? false : options.offline === true;
        // default to false
        const variants = options == null ? false : options.variants === true;
        yield Promise.all([
            bowerInstallDefault(offline),
            variants ? bowerInstallVariants(offline) : Promise.resolve(),
        ]);
    });
}
exports.install = install;
function npmInstall() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info('Installing npm dependencies...');
        yield exec('npm install', { cwd: process.cwd() });
        logger.info('Finished installing npm dependencies.');
    });
}
/**
 * Performs a Bower install, optionally with a specific JSON configuration and
 * output directory.
 */
function _bowerInstall(offline, bowerJson, componentDirectory, variantName) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = defaultBowerConfig({
            save: false,
            directory: componentDirectory,
            offline,
        });
        const bowerLogger = new BowerLogger();
        const cwd = config.cwd || process.cwd();
        const renderer = new StandardRenderer('install', {
            cwd,
            color: true,
        });
        bowerLogger.on('log', (log) => renderer.log(log));
        bowerLogger.on('end', (data) => renderer.end(data));
        bowerLogger.on('error', (err) => renderer.error(err));
        const project = new BowerProject(config, bowerLogger);
        // This is the only way I could find to provide a JSON object to the
        // Project. It's a hack, and might break in the future, but it works.
        if (bowerJson) {
            project._json = bowerJson;
            // Generate a new fake bower.json name because Bower is insting on
            // overwriting this file, even with the {save: false}.
            // TODO(justinfagnani): Figure this out
            const fileName = variantName ? `bower-${variantName}.json` : `bower.json`;
            project._jsonFile = path.join(cwd, fileName);
        }
        yield project.install([], { save: false, offline }, config);
    });
}
function bowerInstallDefault(offline) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info(`Installing default Bower components...`);
        yield _bowerInstall(offline);
        logger.info(`Finished installing default Bower components`);
    });
}
function bowerInstallVariants(offline) {
    return __awaiter(this, void 0, void 0, function* () {
        const bowerJson = yield new Promise((resolve, reject) => {
            const config = defaultBowerConfig({
                save: false,
            });
            const cwd = config.cwd || process.cwd();
            bower_json_1.read(cwd, {}, (err, json) => {
                err ? reject(err) : resolve(json);
            });
        });
        // Variants are patches ontop of the default bower.json, typically used to
        // override dependencies to specific versions for testing. Variants are
        // installed into folders named "bower_components-{variantName}", which
        // are
        // used by other tools like polyserve.
        const variants = bowerJson['variants'];
        if (variants) {
            yield Promise.all(Object.keys(variants).map((variantName) => __awaiter(this, void 0, void 0, function* () {
                const variant = variants[variantName];
                const variantBowerJson = _mergeJson(variant, bowerJson);
                const variantDirectory = `bower_components-${variantName}`;
                logger.info(`Installing variant ${variantName} to ${variantDirectory}...`);
                yield _bowerInstall(offline, variantBowerJson, variantDirectory, variantName);
                logger.info(`Finished installing variant ${variantName}`);
            })));
        }
    });
}
/**
 * Exported only for testing
 */
function _mergeJson(from, to) {
    if (isPrimitiveOrArray(from) || isPrimitiveOrArray(to)) {
        return from;
    }
    const toObject = to;
    const fromObject = from;
    // First, make a shallow copy of `to` target
    const merged = Object.assign({}, toObject);
    // Next, merge in properties from `from`
    for (const key in fromObject) {
        // TODO(justinfagnani): If needed, we can add modifiers to the key
        // names in `from` to control merging:
        //   * "key=" would always overwrite, not merge, the property
        //   * "key|" could force a union (merge), even for Arrays
        //   * "key&" could perform an intersection
        merged[key] = _mergeJson(fromObject[key], toObject[key]);
    }
    return merged;
}
exports._mergeJson = _mergeJson;
function isPrimitiveOrArray(value) {
    if (value == null) {
        return true;
    }
    if (Array.isArray(value)) {
        return true;
    }
    const type = typeof value;
    return type === 'string' || type === 'number' || type === 'boolean';
}
//# sourceMappingURL=install.js.map