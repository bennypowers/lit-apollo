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
Object.defineProperty(exports, "__esModule", { value: true });
const dom5 = require("dom5/lib/index-next");
const cssWhat = require("css-what");
// Attributes that are on every HTMLElement.
exports.sharedAttributes = new Set([
    // From https://html.spec.whatwg.org/multipage/dom.html#htmlelement
    'title',
    'lang',
    'translate',
    'dir',
    'hidden',
    'tabindex',
    'accesskey',
    'draggable',
    'spellcheck',
    'innertext',
    'contextmenu',
    // https://html.spec.whatwg.org/multipage/interaction.html#elementcontenteditable
    'contenteditable',
    // https://dom.spec.whatwg.org/#interface-element
    'id',
    'class',
    'slot',
    // https://html.spec.whatwg.org/multipage/dom.html#global-attributes
    'itemid',
    'itemprop',
    'itemref',
    'itemscope',
    'itemtype',
    'is',
    'style',
    // aria-* http://www.w3.org/TR/wai-aria/states_and_properties#state_prop_def
    // role: http://www.w3.org/TR/wai-aria/host_languages#host_general_role
    'aria-activedescendant',
    'aria-atomic',
    'aria-autocomplete',
    'aria-busy',
    'aria-checked',
    'aria-controls',
    'aria-describedby',
    'aria-disabled',
    'aria-dropeffect',
    'aria-expanded',
    'aria-flowto',
    'aria-grabbed',
    'aria-haspopup',
    'aria-hidden',
    'aria-invalid',
    'aria-label',
    'aria-labelledby',
    'aria-level',
    'aria-live',
    'aria-multiline',
    'aria-multiselectable',
    'aria-orientation',
    'aria-owns',
    'aria-posinset',
    'aria-pressed',
    'aria-readonly',
    'aria-relevant',
    'aria-required',
    'aria-selected',
    'aria-setsize',
    'aria-sort',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-valuetext',
    'role',
]);
// Properties that are on every HTMLElement
exports.sharedProperties = new Set([
    // From https://html.spec.whatwg.org/multipage/dom.html#htmlelement
    'title',
    'lang',
    'translate',
    'dir',
    'hidden',
    'tabIndex',
    'accessKey',
    'draggable',
    'spellcheck',
    'innerText',
    // https://html.spec.whatwg.org/multipage/interaction.html#elementcontenteditable
    'contentEditable',
    'isContentEditable',
    // https://dom.spec.whatwg.org/#interface-element
    'id',
    'className',
    'slot',
    'is',
]);
/**
 * If the given node is a text node, add the given addition indentation to
 * each line of its contents.
 */
function addIndentation(textNode, additionalIndentation = '  ') {
    if (!dom5.isTextNode(textNode)) {
        return;
    }
    const text = dom5.getTextContent(textNode);
    const indentedText = text.split('\n')
        .map((line) => {
        return line.length > 0 ? additionalIndentation + line : line;
    })
        .join('\n');
    dom5.setTextContent(textNode, indentedText);
}
exports.addIndentation = addIndentation;
/**
 * Estimates the leading indentation of direct children inside the given node.
 *
 * Assumes that the given element is written in one of these styles:
 *   <foo>
 *   </foo>
 *
 *   <foo>
 *     <bar></bar>
 *   </foo>
 *
 * And not like:
 *   <foo><bar></bar></bar>
 */
function getIndentationInside(parentNode) {
    if (!parentNode.childNodes || parentNode.childNodes.length === 0) {
        return '';
    }
    const firstChild = parentNode.childNodes[0];
    if (!dom5.isTextNode(firstChild)) {
        return '';
    }
    const text = dom5.getTextContent(firstChild);
    const match = text.match(/(^|\n)([ \t]+)/);
    if (!match) {
        return '';
    }
    // If the it's an empty node with just one line of whitespace, like this:
    //     <div>
    //     </div>
    // Then the indentation of actual content inside is one level deeper than
    // the whitespace on that second line.
    if (parentNode.childNodes.length === 1 && text.match(/^\n[ \t]+$/)) {
        return match[2] + '  ';
    }
    return match[2];
}
exports.getIndentationInside = getIndentationInside;
/**
 * Converts a css selector into a dom5 predicate.
 *
 * This is intended for handling only selectors that match an individual element
 * in isolation, it does throws if the selector talks about relationships
 * between elements like `.foo .bar` or `.foo > .bar`.
 *
 * Set `isPolymerTemplate` to true to apply selectors in data-bound attributes,
 * e.g. `.foo.bar` would return both nodes of the following template:
 *
 *     <div class="foo bar"></div>
 *     <div class$="foo bar"></div>
 */
function elementSelectorToPredicate(simpleSelector, isPolymerTemplate = false) {
    const parsed = cssWhat(simpleSelector);
    // The output of cssWhat is two levels of arrays. The outer level are any
    // selectors joined with a comma, so it matches if any of the inner selectors
    // match. The inner array are simple selectors like `.foo` and `#bar` which
    // must all match.
    return dom5.predicates.OR(...parsed.map((simpleSelectors) => {
        return dom5.predicates.AND(...simpleSelectors.map((selector) => simpleSelectorToPredicate(selector, isPolymerTemplate)));
    }));
}
exports.elementSelectorToPredicate = elementSelectorToPredicate;
function simpleSelectorToPredicate(selector, isPolymerTemplate) {
    switch (selector.type) {
        case 'adjacent':
        case 'child':
        case 'descendant':
        case 'parent':
        case 'sibling':
        case 'pseudo':
            throw new Error(`Unsupported CSS operator: ${selector.type}`);
        case 'attribute':
            if (isPolymerTemplate) {
                return dom5.predicates.OR(attributeSelectorToPredicate(selector), attributeSelectorToPredicate(Object.assign({}, selector, { name: selector.name + '$' })));
            }
            return attributeSelectorToPredicate(selector);
        case 'tag':
            return dom5.predicates.hasTagName(selector.name);
        case 'universal':
            return () => true;
    }
    const never = selector;
    throw new Error(`Unexpected node type from css parser: ${never}`);
}
function attributeSelectorToPredicate(selector) {
    switch (selector.action) {
        case 'exists':
            return dom5.predicates.hasAttr(selector.name);
        case 'equals':
            return dom5.predicates.hasAttrValue(selector.name, selector.value);
        case 'start':
            return (el) => {
                const attrValue = dom5.getAttribute(el, selector.name);
                return attrValue != null && attrValue.startsWith(selector.value);
            };
        case 'end':
            return (el) => {
                const attrValue = dom5.getAttribute(el, selector.name);
                return attrValue != null && attrValue.endsWith(selector.value);
            };
        case 'element':
            return dom5.predicates.hasSpaceSeparatedAttrValue(selector.name, selector.value);
        case 'any':
            return (el) => {
                const attrValue = dom5.getAttribute(el, selector.name);
                return attrValue != null && attrValue.includes(selector.value);
            };
    }
    const never = selector.action;
    throw new Error(`Unexpected type of attribute matcher from CSS parser ${never}`);
}
function removeTrailingWhitespace(textNode, parsedDocument) {
    const prevText = dom5.getTextContent(textNode);
    const match = prevText.match(/\n?[ \t]*$/);
    if (!match) {
        return;
    }
    const range = parsedDocument.sourceRangeForNode(textNode);
    const lengthOfPreviousLine = parsedDocument.newlineIndexes[range.end.line - 1] -
        (parsedDocument.newlineIndexes[range.end.line - 2] || -1) - 1;
    const newRange = Object.assign({}, range, { start: {
            column: lengthOfPreviousLine,
            line: range.end.line - 1,
        } });
    return { range: newRange, replacementText: '' };
}
exports.removeTrailingWhitespace = removeTrailingWhitespace;
function addAttribute(parsedDocument, node, attribute, attributeValue) {
    const tagRange = parsedDocument.sourceRangeForStartTag(node);
    const range = {
        file: tagRange.file,
        start: { line: tagRange.end.line, column: tagRange.end.column - 1 },
        end: { line: tagRange.end.line, column: tagRange.end.column - 1 }
    };
    const replacementText = ` ${attribute}="${attributeValue}"`;
    return { replacementText, range };
}
exports.addAttribute = addAttribute;
function prependContentInto(parsedDocument, node, replacementText) {
    const tagRange = parsedDocument.sourceRangeForStartTag(node);
    const range = {
        file: tagRange.file,
        start: { line: tagRange.end.line, column: tagRange.end.column },
        end: { line: tagRange.end.line, column: tagRange.end.column }
    };
    return { replacementText, range };
}
exports.prependContentInto = prependContentInto;
function insertContentAfter(parsedDocument, node, replacementText) {
    const tagRange = parsedDocument.sourceRangeForNode(node);
    const range = {
        file: tagRange.file,
        start: { line: tagRange.end.line, column: tagRange.end.column },
        end: { line: tagRange.end.line, column: tagRange.end.column }
    };
    return { replacementText, range };
}
exports.insertContentAfter = insertContentAfter;
function removeNode(parsedDocument, node) {
    const parentChildren = node.parentNode.childNodes;
    const prevNode = parentChildren[parentChildren.indexOf(node) - 1];
    const fix = [];
    if (prevNode && dom5.isTextNode(prevNode)) {
        const trailingWhiteSpace = removeTrailingWhitespace(prevNode, parsedDocument);
        if (trailingWhiteSpace) {
            fix.push(trailingWhiteSpace);
        }
    }
    fix.push({ replacementText: '', range: parsedDocument.sourceRangeForNode(node) });
    return fix;
}
exports.removeNode = removeNode;
//# sourceMappingURL=util.js.map