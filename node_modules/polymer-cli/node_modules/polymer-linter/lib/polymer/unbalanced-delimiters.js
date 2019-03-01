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
const polymer_analyzer_1 = require("polymer-analyzer");
const rule_1 = require("../html/rule");
const registry_1 = require("../registry");
const util_1 = require("../util");
const matchers = require("./matchers");
/**
 * Unbalanced binding expression delimiters occurs when a value such as
 * `[[myValue]]` or `{{myValue}}` have too many or too few brackets on either
 * side.
 */
class UnbalancedDelimiters extends rule_1.HtmlRule {
    constructor() {
        super(...arguments);
        this.code = 'unbalanced-polymer-delimiters';
        this.description = util_1.stripIndentation(`
      Matches unbalanced delimiters around Polymer databinding expressions.

      For example, {{foo} is missing a } at the end, it should instead be
      {{foo}}.
  `);
    }
    checkDocument(parsedHtml) {
        return __awaiter(this, void 0, void 0, function* () {
            let warnings = [];
            const templates = dom5.queryAll(parsedHtml.ast, matchers.isDatabindingTemplate, dom5.childNodesIncludeTemplate);
            for (const template of templates) {
                warnings =
                    warnings.concat(this._getWarningsForTemplate(parsedHtml, template));
            }
            return warnings;
        });
    }
    _getWarningsForElementAttrs(parsedHtml, element) {
        const warnings = [];
        for (const attr of element.attrs) {
            if (this._extractBadBindingExpression(attr.value || '')) {
                warnings.push(new polymer_analyzer_1.Warning({
                    parsedDocument: parsedHtml,
                    code: 'unbalanced-delimiters',
                    message: this._getMessageForBadBindingExpression(attr.value),
                    severity: polymer_analyzer_1.Severity.ERROR,
                    sourceRange: parsedHtml.sourceRangeForAttributeValue(element, attr.name)
                }));
            }
        }
        return warnings;
    }
    _getWarningsForTemplate(parsedHtml, template) {
        let warnings = [];
        const content = parse5.treeAdapters.default.getTemplateContent(template);
        for (const node of dom5.depthFirst(content)) {
            if (dom5.isElement(node) && node.attrs.length > 0) {
                warnings =
                    warnings.concat(this._getWarningsForElementAttrs(parsedHtml, node));
            }
            else if (dom5.isTextNode(node) && typeof node.value === 'string' &&
                this._extractBadBindingExpression(node.value)) {
                warnings.push(new polymer_analyzer_1.Warning({
                    parsedDocument: parsedHtml,
                    code: 'unbalanced-delimiters',
                    message: this._getMessageForBadBindingExpression(node.value),
                    severity: polymer_analyzer_1.Severity.ERROR,
                    sourceRange: parsedHtml.sourceRangeForNode(node)
                }));
            }
        }
        return warnings;
    }
    _getMessageForBadBindingExpression(text) {
        const delimitersOnly = text.replace(/[^\[\]{}]/g, '');
        const suggestions = {
            '{{}': ' are you missing a closing \'}\'?',
            '[[]': ' are you missing a closing \']\'?',
            '{}}': ' are you missing an opening \'{\'?',
            '[]]': ' are you missing an opening \'[\'?'
        };
        const suggestion = suggestions[delimitersOnly] || '';
        return 'Invalid polymer expression delimiters.  You put \'' +
            delimitersOnly + '\'' + suggestion;
    }
    _extractBadBindingExpression(text) {
        // 4 cases, {{}, {}}, [[], []]
        const match = text.match(/\{\{([^\}]*)\}(?!\})|\[\[([^\]]*)\](?!\])/) ||
            text.split('').reverse().join('').match(/\}\}([^\{]*)\{(?!\{)|\]\]([^\[]*)\[(?!\[)/);
        if (match) {
            return text;
        }
        return undefined;
    }
}
registry_1.registry.register(new UnbalancedDelimiters());
//# sourceMappingURL=unbalanced-delimiters.js.map