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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A lint rule. Can take a package and find Warnings.
 */
class Rule {
    constructor() {
        this.cache = new WeakMap();
    }
    /**
     * Finds all warnings in the given document.
     *
     * If this rule has checked this document before, just looks up the result
     * in our cache. Because Documents are immutable and are guaranteed to be
     * different if any of their contents are different, this caching is safe.
     */
    cachedCheck(document) {
        const cacheResult = this.cache.get(document);
        if (cacheResult) {
            return cacheResult;
        }
        const result = this.check(document);
        this.cache.set(document, result);
        return result;
    }
}
exports.Rule = Rule;
/**
 * A named collection of lint rules. Useful for building collections of rules,
 * like rules that note problems that may arise upgrading from Polymer 1.0 to
 * 2.0.
 */
class RuleCollection {
    constructor(code, description, rules) {
        this.code = code;
        this.description = description;
        this.rules = rules;
    }
}
exports.RuleCollection = RuleCollection;
// Need to have ParsedDocument in exported types for some reason.
const t = null;
t;
//# sourceMappingURL=rule.js.map