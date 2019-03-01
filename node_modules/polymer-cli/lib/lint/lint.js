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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const chokidar = require("chokidar");
const fs = require("mz/fs");
const path = require("path");
const logging = require("plylog");
const polymer_analyzer_1 = require("polymer-analyzer");
const warning_printer_1 = require("polymer-analyzer/lib/warning/warning-printer");
const lintLib = require("polymer-linter");
const command_1 = require("../commands/command");
const util_1 = require("../util");
const logger = logging.getLogger('cli.lint');
if (Symbol.asyncIterator === undefined) {
    // tslint:disable-next-line: no-any polyfilling.
    Symbol.asyncIterator = Symbol('asyncIterator');
}
function lint(options, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const lintOptions = (config.lint || {});
        const ruleCodes = options.rules || lintOptions.rules;
        if (ruleCodes === undefined) {
            logger.warn(`You must state which lint rules to use. You can use --rules, ` +
                `but for a project it's best to use polymer.json. e.g.

{
  "lint": {
    "rules": ["polymer-2"]
  }
}`);
            return new command_1.CommandResult(1);
        }
        const rules = lintLib.registry.getRules(ruleCodes);
        const { analyzer, urlLoader, urlResolver, warningFilter } = yield config.initializeAnalyzer();
        const linter = new lintLib.Linter(rules, analyzer);
        if (options.watch) {
            return watchLoop(analyzer, urlLoader, urlResolver, linter, options, config, warningFilter);
        }
        else {
            return run(analyzer, urlLoader, urlResolver, linter, options, config, warningFilter);
        }
    });
}
exports.lint = lint;
/**
 * Run a single pass of the linter, and then report the results or fix warnings
 * as requested by `options`.
 *
 * In a normal run this is called once and then it's done. When running with
 * `--watch` this function is called each time files on disk change.
 */
function run(analyzer, urlLoader, urlResolver, linter, options, config, filter, editActionsToAlwaysApply = new Set(options.edits || []), watcher) {
    return __awaiter(this, void 0, void 0, function* () {
        const sources = yield util_1.getProjectSources(options, config);
        const { warnings, analysis } = sources !== undefined ?
            yield linter.lint(sources) :
            yield linter.lintPackage();
        const filtered = warnings.filter((w) => !filter.shouldIgnore(w));
        if (options.fix) {
            const changedFiles = yield fix(filtered, options, config, analyzer, analysis, urlLoader, urlResolver, editActionsToAlwaysApply);
            if (watcher) {
                // Some file watcher interfaces won't notice this change immediately after
                // the one that initiated this lint run. Ensure that we notice these
                // changes.
                for (const changedFile of changedFiles) {
                    watcher.ensureChangeIsNoticed(path.resolve(config.root, changedFile));
                }
            }
            if (changedFiles.size === 0 && options.reportIfNoFix) {
                yield report(filtered, urlResolver);
            }
        }
        else {
            return report(filtered, urlResolver);
        }
    });
}
function watchLoop(analyzer, urlLoader, urlResolver, linter, options, config, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        var e_1, _a;
        let analysis;
        if (options.input) {
            analysis = yield analyzer.analyze(options.input);
        }
        else {
            analysis = yield analyzer.analyzePackage();
        }
        /** Remember the user's preferences across runs. */
        const lintActionsToAlwaysApply = new Set(options.edits || []);
        const urls = new Set([...analysis.getFeatures({ kind: 'document' })].map((d) => d.url));
        const paths = [];
        for (const url of urls) {
            const result = urlLoader.getFilePath(url);
            if (result.successful) {
                paths.push(result.value);
            }
        }
        const watcher = new FilesystemChangeStream(chokidar.watch(paths, { persistent: true }));
        try {
            for (var watcher_1 = __asyncValues(watcher), watcher_1_1; watcher_1_1 = yield watcher_1.next(), !watcher_1_1.done;) {
                const changeBatch = watcher_1_1.value;
                const packageRelative = [...changeBatch].map((absPath) => path.relative(config.root, absPath));
                yield analyzer.filesChanged(packageRelative);
                yield run(analyzer, urlLoader, urlResolver, linter, Object.assign({}, options, { reportIfNoFix: true }), config, filter, lintActionsToAlwaysApply, 
                // We pass the watcher to run() so that it can inform the watcher
                // about files that it changes when fixing wanings.
                watcher);
                console.log('\nLint pass complete, waiting for filesystem changes.\n\n');
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (watcher_1_1 && !watcher_1_1.done && (_a = watcher_1.return)) yield _a.call(watcher_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
/**
 * Converts the event-based FSWatcher into a batched async iterator.
 */
class FilesystemChangeStream {
    constructor(watcher) {
        this.nextBatch = new Set();
        this.alertWaiter = undefined;
        this.outOfBandNotices = undefined;
        watcher.on('change', (path) => {
            this.noticeChange(path);
        });
        watcher.on('unlink', (path) => {
            this.noticeChange(path);
        });
    }
    /**
     * Called when we have noticed a change to the file. Ensures that the file
     * will be in the next batch of changes.
     */
    noticeChange(path) {
        this.nextBatch.add(path);
        if (this.alertWaiter) {
            this.alertWaiter();
            this.alertWaiter = undefined;
        }
        if (this.outOfBandNotices) {
            this.outOfBandNotices.delete(path);
        }
    }
    /**
     * Ensures that we will notice a change to the given path, without creating
     * duplicated change notices if the normal filesystem watcher also notices
     * a change to the same path soon.
     *
     * This is a way to notify the watcher when we change a file in response
     * to another change. The FS event watcher used on linux will ignore our
     * change, as it gets grouped in with the change that we were responding to.
     */
    ensureChangeIsNoticed(path) {
        if (!this.outOfBandNotices) {
            const notices = new Set();
            this.outOfBandNotices = notices;
            setTimeout(() => {
                for (const path of notices) {
                    this.noticeChange(path);
                }
                this.outOfBandNotices = undefined;
            }, 100);
        }
        this.outOfBandNotices.add(path);
    }
    /**
     * Yields batches of filenames.
     *
     * Each batch of files are those changes that have changed since the last
     * batch. Never yields an empty batch, but waits until at least one change is
     * noticed.
     */
    [Symbol.asyncIterator]() {
        return __asyncGenerator(this, arguments, function* _a() {
            yield yield __await(new Set());
            while (true) {
                /**
                 * If there are changes, yield them. If there are not, wait until
                 * there are.
                 */
                if (this.nextBatch.size > 0) {
                    const batch = this.nextBatch;
                    this.nextBatch = new Set();
                    yield yield __await(batch);
                }
                else {
                    const waitingPromise = new Promise((resolve) => {
                        this.alertWaiter = resolve;
                    });
                    yield __await(waitingPromise);
                }
            }
        });
    }
}
/**
 * Report a friendly description of the given warnings to stdout.
 */
function report(warnings, urlResolver) {
    return __awaiter(this, void 0, void 0, function* () {
        const printer = new warning_printer_1.WarningPrinter(process.stdout, { verbosity: 'full', color: true, resolver: urlResolver });
        yield printer.printWarnings(warnings);
        if (warnings.length > 0) {
            let message = '';
            const errors = warnings.filter((w) => w.severity === polymer_analyzer_1.Severity.ERROR);
            const warningLevelWarnings = warnings.filter((w) => w.severity === polymer_analyzer_1.Severity.WARNING);
            const infos = warnings.filter((w) => w.severity === polymer_analyzer_1.Severity.INFO);
            const fixable = warnings.filter((w) => !!w.fix).length;
            const hasEditAction = (w) => !!(w.actions && w.actions.find((a) => a.kind === 'edit'));
            const editable = warnings.filter(hasEditAction).length;
            if (errors.length > 0) {
                message += ` ${errors.length} ` +
                    `${chalk.red('error' + plural(errors.length))}`;
            }
            if (warningLevelWarnings.length > 0) {
                message += ` ${warningLevelWarnings.length} ` +
                    `${chalk.yellow('warning' + plural(warnings.length))}`;
            }
            if (infos.length > 0) {
                message += ` ${infos.length} ${chalk.green('info')} message` +
                    plural(infos.length);
            }
            if (fixable > 0) {
                message += `. ${fixable} can be automatically fixed with --fix`;
                if (editable > 0) {
                    message +=
                        ` and ${editable} ${plural(editable, 'have', 'has')} edit actions`;
                }
            }
            else if (editable > 0) {
                message += `. ${editable} ${plural(editable, 'have', 'has')} ` +
                    `edit actions, run with --fix for more info`;
            }
            console.log(`\n\nFound${message}.`);
            return new command_1.CommandResult(1);
        }
    });
}
/**
 * Fix all fixable warnings given. Changes files on the filesystem.
 *
 * Reports a summary of the fixes made to stdout.
 */
function fix(warnings, options, config, analyzer, analysis, urlLoader, urlResolver, editActionsToAlwaysApply) {
    return __awaiter(this, void 0, void 0, function* () {
        const edits = yield getPermittedEdits(warnings, options, editActionsToAlwaysApply, urlResolver);
        if (edits.length === 0) {
            const editCount = warnings.filter((w) => !!w.actions).length;
            if (!options.prompt && editCount) {
                console.log(`No fixes to apply. ` +
                    `${editCount} action${plural(editCount)} may be applied though. ` +
                    `Run in an interactive terminal ` +
                    `with --prompt=true for more details.`);
            }
            else {
                console.log(`No fixes to apply.`);
            }
            return new Set();
        }
        const { appliedEdits, incompatibleEdits, editedFiles } = yield polymer_analyzer_1.applyEdits(edits, polymer_analyzer_1.makeParseLoader(analyzer, analysis));
        const pathToFileMap = new Map();
        for (const [url, newContents] of editedFiles) {
            const conversionResult = urlLoader.getFilePath(url);
            if (conversionResult.successful === false) {
                logger.error(`Problem applying fix to url ${url}: ${conversionResult.error}`);
                return new Set();
            }
            else {
                pathToFileMap.set(conversionResult.value, newContents);
            }
        }
        for (const [newPath, newContents] of pathToFileMap) {
            // need to write a file:// url here.
            yield fs.writeFile(newPath, newContents, { encoding: 'utf8' });
        }
        function getPaths(edits) {
            const paths = new Set();
            for (const edit of edits) {
                for (const replacement of edit) {
                    const url = replacement.range.file;
                    paths.add(getRelativePath(config, urlLoader, url) || url);
                }
            }
            return paths;
        }
        const changedPaths = getPaths(appliedEdits);
        const incompatibleChangedPaths = getPaths(incompatibleEdits);
        if (changedPaths.size > 0) {
            console.log(`Made changes to:`);
            for (const path of changedPaths) {
                console.log(`  ${path}`);
            }
        }
        if (incompatibleChangedPaths.size > 0) {
            console.log('\n');
            console.log(`There were incompatible changes to:`);
            for (const file of incompatibleChangedPaths) {
                console.log(`  ${file}`);
            }
            console.log(`\nFixed ${appliedEdits.length} ` +
                `warning${plural(appliedEdits.length)}. ` +
                `${incompatibleEdits.length} fixes had conflicts with other fixes. ` +
                `Rerunning the command may apply them.`);
        }
        else {
            console.log(`\nFixed ${appliedEdits.length} ` +
                `warning${plural(appliedEdits.length)}.`);
        }
        return changedPaths;
    });
}
function plural(n, pluralVal = 's', singularVal = '') {
    if (n === 1) {
        return singularVal;
    }
    return pluralVal;
}
/**
 * Returns edits from fixes and from edit actions with explicit user consent
 * (including prompting the user if we're connected to an interactive
 * terminal).
 */
function getPermittedEdits(warnings, options, editActionsToAlwaysApply, urlResolver) {
    return __awaiter(this, void 0, void 0, function* () {
        const edits = [];
        for (const warning of warnings) {
            if (warning.fix) {
                edits.push(warning.fix);
            }
            for (const action of warning.actions || []) {
                if (action.kind === 'edit') {
                    if (editActionsToAlwaysApply.has(action.code)) {
                        edits.push(action.edit);
                        continue;
                    }
                    if (options.prompt) {
                        const answer = yield askUserForConsentToApplyEditAction(action, warning, urlResolver);
                        switch (answer) {
                            case 'skip':
                                continue;
                            case 'apply-all':
                                editActionsToAlwaysApply.add(action.code);
                            // fall through
                            case 'apply':
                                edits.push(action.edit);
                                break;
                            default:
                                const never = answer;
                                throw new Error(`Got unknown user consent result: ${never}`);
                        }
                    }
                }
            }
        }
        return edits;
    });
}
function askUserForConsentToApplyEditAction(action, warning, urlResolver) {
    return __awaiter(this, void 0, void 0, function* () {
        const choices = [
            {
                value: 'skip',
                name: 'Do not apply this edit',
            },
            {
                value: 'apply',
                name: 'Apply this edit',
            },
            {
                value: 'apply-all',
                name: `Apply all edits like this [${action.code}]`,
            }
        ];
        const message = `
This warning can be addressed with an edit:
${util_1.indent(warning.toString({ resolver: urlResolver }), '    ')}

The edit is:

${util_1.indent(action.description, '    ')}

What should be done?
`.trim();
        return yield util_1.prompt({ message, choices });
    });
}
function getRelativePath(config, urlLoader, url) {
    const result = urlLoader.getFilePath(url);
    if (result.successful) {
        return path.relative(config.root, result.value);
    }
    return undefined;
}
//# sourceMappingURL=lint.js.map