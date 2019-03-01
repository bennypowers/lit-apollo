"use strict";
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
const parse5 = require("parse5");
const stripIndent = require("strip-indent");
const registry_1 = require("../../registry");
const rule_1 = require("../../html/rule");
const polymer_analyzer_1 = require("polymer-analyzer");
const utils_1 = require("./utils");
class PaperToolbarV1ToV2 extends rule_1.HtmlRule {
    constructor() {
        super(...arguments);
        this.code = 'paper-toolbar-v1-to-v2';
        this.description = stripIndent(`
    Warns when children of <paper-toolbar> do not have slots. <paper-toolbar>
    v2 does not have a default slot and \`class="middle"\` / \`class="bottom"\`
    no longer cause children to be distributed.

    Child elements now need a slot; the 'top' slot is equivalent to the default
    distribution position from v1, the 'middle' and 'bottom' slots correspond to
    the distribution position for elements with 'middle' or 'bottom' as a class.

    Non-whitespace-only child text nodes, which can't be distributed to a named
    slot, should be have their non-whitespace portion wrapped in a span
    distributed to the 'top' slot: \`<span slot="top">\` ... \`</span>\`.

    Example usage of <paper-toolbar> v1:

      <paper-toolbar>
        <!-- 1 -->
        <div>
          This element is in the top bar (default).
        </div>

        <!-- 2 -->
        <div class="middle">
          This element is in the middle bar.
        </div>

        <!-- 3 -->
        <div class="bottom">
          This element is in the bottom bar.
        </div>

        <!-- 4 -->
        This text node has non-whitespace characters.
      </paper-toolbar>

    After updating to <paper-toolbar> v2:

      <paper-toolbar>
        <!-- 1 -->
        <div slot="top">
          This element is in the top bar (default).
        </div>

        <!-- 2 -->
        <div class="middle" slot="middle">
          This element is in the middle bar.
        </div>

        <!-- 3 -->
        <div class="bottom" slot="bottom">
          This element is in the bottom bar.
        </div>

        <!-- 4 -->
        <span slot="top">This text node has non-whitespace characters.</span>
      </paper-toolbar>
  `).trim();
    }
    checkDocument(parsedDocument) {
        return __awaiter(this, void 0, void 0, function* () {
            const warnings = [];
            const paperToolbars = dom5.queryAll(parsedDocument.ast, dom5.predicates.hasTagName('paper-toolbar'), dom5.childNodesIncludeTemplate);
            const checkNode = (node) => {
                // Add the appropriate slot for the element: `slot="middle"` or
                // `slot="bottom"` for elements with a 'middle' or 'bottom' class,
                // `slot="top"` for all others.
                if (node.tagName !== undefined && !dom5.hasAttribute(node, 'slot')) {
                    let desiredSlot = 'top';
                    if (dom5.hasSpaceSeparatedAttrValue('class', 'middle')(node)) {
                        desiredSlot = 'middle';
                    }
                    if (dom5.hasSpaceSeparatedAttrValue('class', 'bottom')(node)) {
                        desiredSlot = 'bottom';
                    }
                    const startTagSourceRange = parsedDocument.sourceRangeForStartTag(node);
                    const [startOffset, endOffset] = parsedDocument.sourceRangeToOffsets(startTagSourceRange);
                    const startTagText = parsedDocument.contents.slice(startOffset, endOffset);
                    const isSelfClosing = startTagText.endsWith('/>');
                    warnings.push(new polymer_analyzer_1.Warning({
                        parsedDocument,
                        code: this.code,
                        message: '<paper-toolbar> no longer has a default slot: this ' +
                            'element will not appear in the composed tree. Add `slot="top"` ' +
                            'to distribute to the same position as the previous default ' +
                            'content or `slot="middle"` / `slot="bottom"` to distribute to ' +
                            'the middle or bottom bar.',
                        severity: polymer_analyzer_1.Severity.WARNING,
                        sourceRange: startTagSourceRange,
                        fix: [{
                                range: startTagSourceRange,
                                replacementText: startTagText.slice(0, isSelfClosing ? -2 : -1) +
                                    ` slot="${desiredSlot}"` + (isSelfClosing ? '/' : '') + '>',
                            }],
                    }));
                }
                // Non-whitespace-only text nodes, which were previously distributed into
                // a default slot, now need to be wrapped in `<span
                // slot="top">...</span>`.
                if (node.nodeName === '#text' && node.value.trim() !== '') {
                    const textNodeSourceRange = parsedDocument.sourceRangeForNode(node);
                    const fullText = node.value;
                    const trimmedText = fullText.trim();
                    const trimmedOffset = fullText.indexOf(trimmedText);
                    const treeAdapter = parse5.treeAdapters.default;
                    const fragment = treeAdapter.createDocumentFragment();
                    // Leading whitespace:
                    dom5.append(fragment, {
                        nodeName: '#text',
                        value: fullText.substring(0, trimmedOffset),
                    });
                    // Wrapped text:
                    const span = treeAdapter.createElement('span', '', []);
                    dom5.setAttribute(span, 'slot', 'top');
                    dom5.append(span, {
                        nodeName: '#text',
                        value: trimmedText,
                    });
                    dom5.append(fragment, span);
                    // Trailing whitespace:
                    dom5.append(fragment, {
                        nodeName: '#text',
                        value: fullText.substring(trimmedOffset + trimmedText.length),
                    });
                    warnings.push(new polymer_analyzer_1.Warning({
                        parsedDocument,
                        code: this.code,
                        message: '<paper-toolbar> no longer has a default slot: this ' +
                            'text node will not appear in the composed tree. Wrap with ' +
                            '`<span slot="top">...</span>` to distribute to the same ' +
                            'position as the previous default content.',
                        severity: polymer_analyzer_1.Severity.WARNING,
                        sourceRange: textNodeSourceRange,
                        fix: [{
                                range: textNodeSourceRange,
                                replacementText: parse5.serialize(fragment),
                            }],
                    }));
                }
            };
            for (const paperToolbar of paperToolbars) {
                let suspectNodes = Array.from(paperToolbar.childNodes);
                while (suspectNodes.some(utils_1.nodeIsTemplateExtension)) {
                    suspectNodes =
                        suspectNodes
                            .map((node) => {
                            if (utils_1.nodeIsTemplateExtension(node)) {
                                return Array.from(dom5.childNodesIncludeTemplate(node));
                            }
                            return [node];
                        })
                            .reduce((a, b) => a.concat(b), []);
                }
                for (const node of suspectNodes) {
                    checkNode(node);
                }
            }
            return warnings;
        });
    }
}
registry_1.registry.register(new PaperToolbarV1ToV2());
//# sourceMappingURL=paper-toolbar-v1-to-v2.js.map