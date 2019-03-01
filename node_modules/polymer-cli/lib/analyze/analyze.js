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
const polymer_analyzer_1 = require("polymer-analyzer");
const util_1 = require("../util");
function analyze(config, inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        const { analyzer } = yield config.initializeAnalyzer();
        const isInTests = /(\b|\/|\\)(test)(\/|\\)/;
        const isNotTest = (f) => f.sourceRange != null && !isInTests.test(f.sourceRange.file);
        const projectSourceFiles = yield util_1.getProjectSources({ input: inputs }, config);
        if (projectSourceFiles == null) {
            const _package = yield analyzer.analyzePackage();
            return polymer_analyzer_1.generateAnalysis(_package, analyzer.urlResolver, isNotTest);
        }
        else {
            const analysis = yield analyzer.analyze(projectSourceFiles);
            return polymer_analyzer_1.generateAnalysis(analysis, analyzer.urlResolver, isNotTest);
        }
    });
}
exports.analyze = analyze;
//# sourceMappingURL=analyze.js.map