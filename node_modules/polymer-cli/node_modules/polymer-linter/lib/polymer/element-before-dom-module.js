"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const polymer_analyzer_1 = require("polymer-analyzer");
const rule_1 = require("../html/rule");
const registry_1 = require("../registry");
const util_1 = require("../util");
/**
 * Unbalanced binding expression delimiters occurs when a value such as
 * `[[myValue]]` or `{{myValue}}` have too many or too few brackets on either
 * side.
 */
class ElementBeforeDomModule extends rule_1.HtmlRule {
    constructor() {
        super(...arguments);
        this.code = 'element-before-dom-module';
        this.description = util_1.stripIndentation(`
      Warns for an element being declared before its dom-module.

      For example, this is invalid:
        <script>Polymer({is: 'my-elem'})</script>
        <dom-module id='my-elem'></dom-module>

      But this is fine:
        <dom-module id='my-elem'></dom-module>
        <script>Polymer({is: 'my-elem'})</script>
  `);
    }
    checkDocument(parsedHtml, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const warnings = [];
            const domModules = document.getFeatures({ kind: 'dom-module' });
            if (domModules.size === 0) {
                return warnings; // Early exit quick in the trivial case.
            }
            const domModulesByTagName = new Map();
            for (const domModule of domModules) {
                if (!domModule.id) {
                    continue;
                }
                domModulesByTagName.set(domModule.id, domModule);
            }
            // Gather together all elements defined in this file and in direct imports.
            // Group them together with the source range in this file that they first
            // become active. (We don't look into transitive imports because circularity
            // makes ordering complicated.)
            const localElements = Array.from(document.getFeatures({ kind: 'polymer-element' }))
                .filter((el) => !!el.sourceRange)
                .map((el) => ({ sourceRange: el.sourceRange, elements: [el] }));
            const elementsByImport = Array.from(document.getFeatures({ kind: 'import' }))
                .filter((i) => i.sourceRange)
                .map((i) => {
                if (!i.document) {
                    return undefined;
                }
                // For complicated reasons, non-module script src tags are kinda
                // treated like independent documents, and kinda like inline
                // scripts. Long story short, we need to make sure that any
                // elements defined "in them" aren't actually defined in us, their
                // importer.
                const elements = Array.from(i.document.getFeatures({ kind: 'polymer-element' }));
                const nonlocalElements = elements.filter((e) => e.sourceRange && e.sourceRange.file !== document.url);
                return { sourceRange: i.sourceRange, elements: nonlocalElements };
            })
                .filter((v) => !!v);
            // Sort the element groups by the order in which they appear in the
            // document.
            const sorted = localElements.concat(elementsByImport).sort((a, b) => {
                return polymer_analyzer_1.comparePositionAndRange(a.sourceRange.start, b.sourceRange);
            });
            const seenSoFar = new Set();
            for (const pair of sorted) {
                for (const element of pair.elements) {
                    const tagName = element.tagName;
                    if (!tagName) {
                        continue;
                    }
                    const domModule = domModulesByTagName.get(tagName);
                    if (!domModule || seenSoFar.has(tagName)) {
                        continue;
                    }
                    seenSoFar.add(tagName);
                    // Ok! Finally! domModule is a <dom-module> from `document`, and
                    // `element` is its element definition, first defined at
                    // `pair.sourceRange` in `document`. Now we compare them, and if the
                    // element comes before the dom-module, that's an error!
                    if (polymer_analyzer_1.comparePositionAndRange(pair.sourceRange.start, domModule.sourceRange) === -1) {
                        // TODO(rictic): if we ever support multiple source ranges on
                        //     warnings, this would be a good candidate.
                        warnings.push(new polymer_analyzer_1.Warning({
                            parsedDocument: parsedHtml,
                            code: this.code,
                            message: `A Polymer element must be defined after its ` +
                                `\`<dom-module>\`. If it can't find its \`<dom-module>\` ` +
                                `when it is registered, it will assume it does not have one.`,
                            severity: polymer_analyzer_1.Severity.ERROR,
                            sourceRange: parsedHtml.sourceRangeForStartTag(domModule.astNode.node) ||
                                domModule.sourceRange,
                        }));
                    }
                }
            }
            return warnings;
        });
    }
}
registry_1.registry.register(new ElementBeforeDomModule());
//# sourceMappingURL=element-before-dom-module.js.map