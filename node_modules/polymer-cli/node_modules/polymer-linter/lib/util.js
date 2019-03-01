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
const levenshtein = require("fast-levenshtein");
const polymer_analyzer_1 = require("polymer-analyzer");
const stripIndent = require("strip-indent");
/**
 * A utility for more easily writing long strings inline in code.
 *
 * Strips leading and trailing whitespace, and converts newlines followed
 * by whitespace into a single space. Use like:
 *
 *     stripWhitespace(`
 *         hello
 *         world
 *     `);
 *
 * This evaluates to "hello world".
 */
function stripWhitespace(str) {
    return str.trim().replace(/\s*\n\s*/g, ' ');
}
exports.stripWhitespace = stripWhitespace;
/**
 * A utility for writing long multiline strings inline in code.
 *
 * Determines the initial indentation based on the first indented line,
 * and removes it from all other lines, then trims off leading and trailing
 * whitespace. Use like:
 *
 *     stripIndentation(`
 *         hello
 *           world
 *     `);
 *
 * This evaluates to "hello\n  world"
 */
function stripIndentation(str) {
    return stripIndent(str).trim();
}
exports.stripIndentation = stripIndentation;
function minBy(it, score) {
    let min = undefined;
    let minScore = undefined;
    for (const val of it) {
        const valScore = score(val);
        if (minScore === undefined || valScore < minScore) {
            minScore = valScore;
            min = val;
        }
    }
    if (minScore === undefined) {
        return undefined;
    }
    return { min: min, minScore };
}
exports.minBy = minBy;
function closestSpelling(word, options) {
    return minBy(options, (option) => levenshtein.get(word, option));
}
exports.closestSpelling = closestSpelling;
// TODO(43081j): this exists already in the analyzer's analysis
// namespace. We should remove this function and import it instead
// once it has been exposed in a future analyzer release.
function getDocumentContaining(sourceRange, document) {
    if (!sourceRange) {
        return undefined;
    }
    let mostSpecificDocument = undefined;
    for (const doc of document.getFeatures({ kind: 'document' })) {
        if (polymer_analyzer_1.isPositionInsideRange(sourceRange.start, doc.sourceRange)) {
            if (!mostSpecificDocument ||
                polymer_analyzer_1.isPositionInsideRange(doc.sourceRange.start, mostSpecificDocument.sourceRange)) {
                mostSpecificDocument = doc;
            }
        }
    }
    mostSpecificDocument = mostSpecificDocument || document;
    return mostSpecificDocument.parsedDocument;
}
exports.getDocumentContaining = getDocumentContaining;
/**
 * A utility for indenting a sourceRange
 */
function indentSourceRange(sourceRange, indentation, _document) {
    const fixes = [];
    for (let i = sourceRange.start.line; i <= sourceRange.end.line; i++) {
        const sourcePosition = {
            line: i,
            column: sourceRange.start.column,
        };
        fixes.push({
            range: {
                file: _document.url,
                start: sourcePosition,
                end: sourcePosition,
            },
            replacementText: indentation
        });
    }
    return fixes;
}
exports.indentSourceRange = indentSourceRange;
//# sourceMappingURL=util.js.map