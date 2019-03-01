"use strict";
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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
const dom5 = require("dom5/lib/index-next");
const polymer_analyzer_1 = require("polymer-analyzer");
const rule_1 = require("../html/rule");
const util_1 = require("../html/util");
const registry_1 = require("../registry");
const util_2 = require("../util");
const p = dom5.predicates;
const isCustomStyleV1 = p.AND((node) => !node.parentNode || !p.hasTagName('custom-style')(node.parentNode), p.hasTagName('style'), p.hasAttrValue('is', 'custom-style'));
class CustomStyleExtension extends rule_1.HtmlRule {
    constructor() {
        super(...arguments);
        this.code = 'custom-style-extension';
        this.description = util_2.stripIndentation(`
      Warns when \`custom-style\` is used as type extension on the main document.
      This:
          <style is="custom-style">
            div {
              --app-color: red;
            }
          </style>

      Should instead be written as:
          <custom-style>
            <style is="custom-style">
              div {
                --app-color: red;
              }
            </style>
          </custom-style>
  `);
    }
    checkDocument(parsedDocument, _document) {
        return __awaiter(this, void 0, void 0, function* () {
            const warnings = [];
            const customStyleTags = [...dom5.queryAll(parsedDocument.ast, isCustomStyleV1, dom5.childNodesIncludeTemplate)];
            if (customStyleTags.length === 0) {
                return warnings; // Early exit quick in the trivial case.
            }
            const domModules = Array.from(_document.getFeatures({ kind: 'dom-module' }));
            for (const customStyle of customStyleTags) {
                const sourceRange = parsedDocument.sourceRangeForNode(customStyle);
                if (sourceRange === undefined) {
                    continue;
                }
                const inDomModule = domModules
                    .filter((domModule) => {
                    return polymer_analyzer_1.isPositionInsideRange(sourceRange.start, domModule.sourceRange);
                })
                    .length > 0;
                if (inDomModule) {
                    continue;
                }
                const indentation = util_1.getIndentationInside(customStyle).slice(2);
                const fix = util_2.indentSourceRange(sourceRange, `  `, parsedDocument);
                fix.push({
                    range: {
                        file: parsedDocument.url,
                        start: sourceRange.start,
                        end: sourceRange.start
                    },
                    replacementText: `<custom-style>\n${indentation}`
                });
                fix.push({
                    range: {
                        file: parsedDocument.url,
                        start: sourceRange.end,
                        end: sourceRange.end
                    },
                    replacementText: `\n${indentation}</custom-style>`
                });
                warnings.push(new polymer_analyzer_1.Warning({
                    parsedDocument,
                    code: this.code,
                    message: `<style> extended with \`is="custom-style"\` should be wrapped with \`<custom-style>\`.`,
                    severity: polymer_analyzer_1.Severity.WARNING,
                    sourceRange: parsedDocument.sourceRangeForAttribute(customStyle, 'is'),
                    fix
                }));
            }
            return warnings;
        });
    }
}
registry_1.registry.register(new CustomStyleExtension());
//# sourceMappingURL=custom-style-extension.js.map