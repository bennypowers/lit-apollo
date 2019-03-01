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
const load_config_1 = require("../../../build/load-config");
const util_1 = require("../../util");
suite('load-config', () => {
    suite('loadServiceWorkerConfig()', () => {
        test('should parse the given js file', () => __awaiter(this, void 0, void 0, function* () {
            const configFile = path.resolve(util_1.fixtureDir, 'service-worker-config.js');
            const config = yield load_config_1.loadServiceWorkerConfig(configFile);
            chai_1.assert.ok(config);
            chai_1.assert.deepEqual(config.staticFileGlobs, ['*']);
        }));
    });
});
//# sourceMappingURL=load-config_test.js.map