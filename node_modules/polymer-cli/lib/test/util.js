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
const path = require("path");
exports.fixtureDir = path.join(__dirname, '..', '..', 'test', 'fixtures');
function invertPromise(p) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            result = yield p;
        }
        catch (e) {
            return e;
        }
        throw new Error(`Expected an error, got ${result}`);
    });
}
exports.invertPromise = invertPromise;
/**
 * Call to begin capturing all output. Call the returned function to
 * stop capturing output and get the contents as a string.
 *
 * Captures output from console.log and friends. Does not capture plylog, which
 * doesn't seem to be very easy to intercept.
 */
function interceptOutput(captured) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        const buffer = [];
        const capture = (...args) => {
            buffer.push(args.join(' '));
        };
        console.log = capture;
        console.error = capture;
        console.warn = capture;
        const restoreAndGetOutput = () => {
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
            return buffer.join('\n');
        };
        try {
            yield captured();
        }
        catch (err) {
            const output = restoreAndGetOutput();
            console.error(output);
            throw err;
        }
        return restoreAndGetOutput();
    });
}
exports.interceptOutput = interceptOutput;
//# sourceMappingURL=util.js.map