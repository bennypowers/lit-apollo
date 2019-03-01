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
const childProcess = require("child_process");
/**
 * Run the given command as a forked child process, and return a promise
 * which will reject/resolve with the result of the command.
 *
 * If the command succeeds the promise will be resolved with the stdout+stderr
 * of the command, as a string.
 *
 */
function runCommand(path, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let commandError = undefined;
        options.silent = true;
        const forkedProcess = childProcess.fork(path, args, options);
        const outputPromise = pipesToString(forkedProcess.stdout, forkedProcess.stderr);
        // listen for errors as they may prevent the exit event from firing
        forkedProcess.on('error', (error) => {
            commandError = error;
        });
        const exitCode = yield new Promise((resolve) => {
            forkedProcess.on('exit', resolve);
        });
        if (exitCode !== 0) {
            commandError = new Error(`Error running ${path} with args ${args}. ` +
                `Got exit code: ${exitCode}`);
        }
        if (!commandError) {
            return outputPromise;
        }
        // If the command was successful there's no need to print anything to
        // the console, but if it failed then its output is probably helpful.
        // Print out the output, then reject the final result with the original
        // error.
        const out = yield outputPromise;
        if (options.failureExpected) {
            // Throw the output string as our error if failure is expected.
            throw out;
        }
        console.log(`Output of failed command 'node ${path} ${args.join(' ')}' ` +
            `in directory ${options.cwd}`);
        console.log(out);
        throw commandError;
    });
}
exports.runCommand = runCommand;
/**
 * Reads the two streams and produces a promise of their combined output as a
 * string.
 */
function pipesToString(stdout, stderr) {
    return __awaiter(this, void 0, void 0, function* () {
        let str = '';
        const promises = [];
        for (const stream of [stdout, stderr]) {
            if (!stream) {
                continue;
            }
            stream.setEncoding('utf8');
            stream.on('data', function (chunk) {
                str += chunk;
            });
            promises.push(new Promise((resolve) => {
                stream.on('end', resolve);
            }));
        }
        yield Promise.all(promises);
        return str;
    });
}
//# sourceMappingURL=run-command.js.map