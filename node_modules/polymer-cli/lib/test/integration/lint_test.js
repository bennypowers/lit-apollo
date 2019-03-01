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
const fs = require("fs");
const os = require("os");
const chai_1 = require("chai");
const path = require("path");
const run_command_1 = require("./run-command");
const util_1 = require("../util");
const mz_1 = require("mz");
suite('polymer lint', function () {
    const binPath = path.join(__dirname, '../../../bin/polymer.js');
    this.timeout(8 * 1000);
    test('handles a simple correct case', () => __awaiter(this, void 0, void 0, function* () {
        const cwd = path.join(util_1.fixtureDir, 'lint-simple');
        yield run_command_1.runCommand(binPath, ['lint'], { cwd });
    }));
    test('fails when rules are not specified', () => __awaiter(this, void 0, void 0, function* () {
        const cwd = path.join(util_1.fixtureDir, 'lint-no-polymer-json');
        const result = run_command_1.runCommand(binPath, ['lint'], { cwd, failureExpected: true });
        yield util_1.invertPromise(result);
    }));
    test('takes rules from the command line', () => __awaiter(this, void 0, void 0, function* () {
        const cwd = path.join(util_1.fixtureDir, 'lint-no-polymer-json');
        yield run_command_1.runCommand(binPath, ['lint', '--rules=polymer-2-hybrid'], { cwd });
    }));
    test('fails when lint errors are found', () => __awaiter(this, void 0, void 0, function* () {
        const cwd = path.join(util_1.fixtureDir, 'lint-with-error');
        const result = run_command_1.runCommand(binPath, ['lint'], { cwd, failureExpected: true });
        const output = yield util_1.invertPromise(result);
        chai_1.assert.include(output, 'Style tags should not be direct children of <dom-module>');
    }));
    test('applies fixes to a package when requested', () => __awaiter(this, void 0, void 0, function* () {
        const fixtureDir = path.join(util_1.fixtureDir, 'lint-fixes');
        const cwd = getTempCopy(fixtureDir);
        const output = yield run_command_1.runCommand(binPath, ['lint', '--fix'], { cwd });
        chai_1.assert.deepEqual(fs.readFileSync(path.join(cwd, 'toplevel-bad.html'), 'utf-8'), `<style>
  div {
    @apply --foo;
  }
</style>
`);
        chai_1.assert.deepEqual(fs.readFileSync(path.join(cwd, 'subdir', 'nested-bad.html'), 'utf-8'), `<style>
  div {
    @apply --bar;
  }
</style>
`);
        chai_1.assert.deepEqual(output.trim(), `
Made changes to:
  toplevel-bad.html
  subdir${path.sep}nested-bad.html

Fixed 2 warnings.
`.trim());
    }));
    test('applies fixes to a specific file when requested', () => __awaiter(this, void 0, void 0, function* () {
        const fixtureDir = path.join(util_1.fixtureDir, 'lint-fixes');
        const cwd = getTempCopy(fixtureDir);
        const output = yield run_command_1.runCommand(binPath, ['lint', '--fix', '-i', 'toplevel-bad.html'], { cwd });
        chai_1.assert.deepEqual(fs.readFileSync(path.join(cwd, 'toplevel-bad.html'), 'utf-8'), `<style>
  div {
    @apply --foo;
  }
</style>
`);
        chai_1.assert.deepEqual(fs.readFileSync(path.join(cwd, 'subdir', 'nested-bad.html'), 'utf-8'), `<style>
  div {
    @apply(--bar);
  }
</style>
`);
        chai_1.assert.deepEqual(output.trim(), `
Made changes to:
  toplevel-bad.html

Fixed 1 warning.
`.trim());
    }));
    test('only applies safe fixes when not prompting', () => __awaiter(this, void 0, void 0, function* () {
        const fixtureDir = path.join(util_1.fixtureDir, 'lint-edits');
        const cwd = getTempCopy(fixtureDir);
        const result = run_command_1.runCommand(binPath, ['lint', '--fix', '--prompt=false', 'file.html'], { cwd });
        const output = yield result;
        chai_1.assert.deepEqual(output.trim(), `
Made changes to:
  file.html

Fixed 2 warnings.`.trim());
        // Running --fix with no prompt results in only the basic <content>
        // elements changing.
        chai_1.assert.deepEqual(fs.readFileSync(path.join(cwd, 'file.html'), 'utf-8'), `<dom-module id="foo-elem">
  <template>
    <content select=".foo"></content>
    <slot></slot>
  </template>
  <script>
    customElements.define('foo-elem', class extends HTMLElement { });
  </script>
</dom-module>

<dom-module id="bar-elem">
  <template>
    <content select=".bar"></content>
    <slot></slot>
  </template>
  <script>
    customElements.define('bar-elem', class extends HTMLElement { });
  </script>
</dom-module>
`);
    }));
    test('applies edit actions when requested by command line', () => __awaiter(this, void 0, void 0, function* () {
        const fixtureDir = path.join(util_1.fixtureDir, 'lint-edits');
        const cwd = getTempCopy(fixtureDir);
        const result = run_command_1.runCommand(binPath, [
            'lint',
            '--fix',
            '--prompt=false',
            '--edits=content-with-select',
            'file.html'
        ], { cwd });
        const output = yield result;
        chai_1.assert.deepEqual(output.trim(), `
Made changes to:
  file.html

Fixed 4 warnings.
`.trim());
        // Running --fix with no prompt results in only the basic <content>
        // elements changing.
        chai_1.assert.deepEqual(fs.readFileSync(path.join(cwd, 'file.html'), 'utf-8'), `<dom-module id="foo-elem">
  <template>
    <slot name="foo" old-content-selector=".foo"></slot>
    <slot></slot>
  </template>
  <script>
    customElements.define('foo-elem', class extends HTMLElement { });
  </script>
</dom-module>

<dom-module id="bar-elem">
  <template>
    <slot name="bar" old-content-selector=".bar"></slot>
    <slot></slot>
  </template>
  <script>
    customElements.define('bar-elem', class extends HTMLElement { });
  </script>
</dom-module>
`);
    }));
    test('--npm finds dependencies in "node_modules"', () => __awaiter(this, void 0, void 0, function* () {
        const cwd = path.join(util_1.fixtureDir, 'element-with-npm-deps');
        yield run_command_1.runCommand(binPath, ['lint', '--npm'], { cwd });
    }));
    test('--component-dir finds dependencies in the specified directory', () => __awaiter(this, void 0, void 0, function* () {
        const cwd = path.join(util_1.fixtureDir, 'element-with-other-deps');
        yield run_command_1.runCommand(binPath, ['lint', '--component-dir=path/to/deps/'], { cwd });
    }));
    suite('--watch', function () {
        this.timeout(12 * 1000);
        const delimiter = `\nLint pass complete, waiting for filesystem changes.\n\n`;
        let testName = 're-reports lint results when the filesystem changes';
        test(testName, () => __awaiter(this, void 0, void 0, function* () {
            const fixtureDir = path.join(util_1.fixtureDir, 'lint-simple');
            const cwd = getTempCopy(fixtureDir);
            const forkedProcess = mz_1.child_process.fork(binPath, ['lint', '--watch'], { cwd, silent: true });
            const reader = new StreamReader(forkedProcess.stdout);
            chai_1.assert.deepEqual(yield reader.readUntil(delimiter), '');
            fs.writeFileSync(path.join(cwd, 'my-elem.html'), '<style>\nfoo {@apply(--bar)}\n</style>');
            chai_1.assert.deepEqual(yield reader.readUntil(delimiter), `

foo {@apply(--bar)}
           ~~~~~~~

my-elem.html(2,12) error [at-apply-with-parens] - @apply with parentheses is deprecated. Prefer: @apply --foo;


Found 1 error. 1 can be automatically fixed with --fix.
`);
            // Wait for a moment
            yield sleep(300);
            // Fix the error
            fs.writeFileSync(path.join(cwd, 'my-elem.html'), '<style>\nfoo {@apply --bar}\n</style>');
            // Expect empty output again.
            chai_1.assert.deepEqual(yield reader.readUntil(delimiter), ``);
            // Expect no other output.
            yield sleep(200);
            chai_1.assert.deepEqual(yield reader.readRestOfBuffer(), '');
            forkedProcess.kill();
        }));
        testName = 'with --fix, reports and fixes when the filesystem changes';
        test(testName, () => __awaiter(this, void 0, void 0, function* () {
            const fixtureDir = path.join(util_1.fixtureDir, 'lint-simple');
            const cwd = getTempCopy(fixtureDir);
            const forkedProcess = mz_1.child_process.fork(binPath, ['lint', '--watch', '--fix'], { cwd, silent: true });
            const reader = new StreamReader(forkedProcess.stdout);
            // The first pass yields no warnings:
            chai_1.assert.deepEqual(yield reader.readUntil(delimiter), 'No fixes to apply.\n');
            // Add an error
            fs.writeFileSync(path.join(cwd, 'my-elem.html'), '<style>\nfoo {@apply(--bar)}\n</style>');
            // Expect warning output.
            chai_1.assert.deepEqual((yield reader.readUntil(delimiter)).trim(), `
Made changes to:
  my-elem.html

Fixed 1 warning.
`.trim());
            // The automated fix triggers the linter to run again.
            chai_1.assert.deepEqual(yield reader.readUntil(delimiter), 'No fixes to apply.\n');
            // Expect no other output.
            yield sleep(200);
            chai_1.assert.deepEqual(yield reader.readRestOfBuffer(), '');
            forkedProcess.kill();
        }));
    });
});
function getTempCopy(fromDir) {
    const toDir = fs.mkdtempSync(path.join(os.tmpdir(), path.basename(fromDir)));
    copyDir(fromDir, toDir);
    return toDir;
}
function copyDir(fromDir, toDir) {
    for (const inner of fs.readdirSync(fromDir)) {
        const fromInner = path.join(fromDir, inner);
        const toInner = path.join(toDir, inner);
        const stat = fs.statSync(fromInner);
        if (stat.isDirectory()) {
            fs.mkdirSync(toInner);
            copyDir(fromInner, toInner);
        }
        else {
            fs.writeFileSync(toInner, fs.readFileSync(fromInner));
        }
    }
}
/** Simple class for reading up to a delimitor in an unending stream. */
class StreamReader {
    constructor(readStream) {
        this.buffer = '';
        this.wakeup = () => undefined;
        readStream.setEncoding('utf8');
        readStream.on('data', (chunk) => {
            this.buffer += chunk;
            if (this.wakeup) {
                this.wakeup();
            }
        });
    }
    readUntil(text) {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const index = this.buffer.indexOf(text);
                if (index >= 0) {
                    const result = this.buffer.slice(0, index);
                    this.buffer = this.buffer.slice(index + text.length + 1);
                    return result;
                }
                yield new Promise((resolve) => {
                    this.wakeup = resolve;
                });
            }
        });
    }
    readRestOfBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.buffer;
            this.buffer = '';
            return result;
        });
    }
}
function sleep(millis) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, millis));
    });
}
//# sourceMappingURL=lint_test.js.map