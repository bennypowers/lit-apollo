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
import * as dom5 from 'dom5/lib/index-next';
import { ParsedHtmlDocument, SourceRange, Replacement } from 'polymer-analyzer';
export declare const sharedAttributes: Set<string>;
export declare const sharedProperties: Set<string>;
/**
 * If the given node is a text node, add the given addition indentation to
 * each line of its contents.
 */
export declare function addIndentation(textNode: dom5.Node, additionalIndentation?: string): void;
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
export declare function getIndentationInside(parentNode: dom5.Node): string;
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
export declare function elementSelectorToPredicate(simpleSelector: string, isPolymerTemplate?: boolean): dom5.Predicate;
export declare function removeTrailingWhitespace(textNode: dom5.Node, parsedDocument: ParsedHtmlDocument): {
    range: SourceRange;
    replacementText: string;
} | undefined;
export declare function addAttribute(parsedDocument: ParsedHtmlDocument, node: dom5.Node, attribute: string, attributeValue: string): Replacement;
export declare function prependContentInto(parsedDocument: ParsedHtmlDocument, node: dom5.Node, replacementText: string): Replacement;
export declare function insertContentAfter(parsedDocument: ParsedHtmlDocument, node: dom5.Node, replacementText: string): Replacement;
export declare function removeNode(parsedDocument: ParsedHtmlDocument, node: dom5.Node): Replacement[];
