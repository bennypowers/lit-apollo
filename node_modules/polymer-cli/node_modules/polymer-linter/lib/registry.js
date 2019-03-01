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
const rule_1 = require("./rule");
const util_1 = require("./util");
/**
 * A centralized place where lint rules and rule collections can register
 * themselves and you can get a collection of rules by querying.
 *
 * Almost all users should not construct their own registry, but instead use
 * the instance exported as `registry` from this module.
 */
class LintRegistry {
    constructor() {
        this._all = new Map();
    }
    /**
     * Register the given rule or collection so that it can be later retrieved.
     */
    register(rule) {
        const existing = this._all.get(rule.code);
        if (existing) {
            throw new Error(util_1.stripWhitespace(`
          Attempted to register more than one rule / rule collection with
          code '${rule.code}'. Existing rule:
          ${existing.constructor}, new rule: ${rule.constructor}`));
        }
        if (rule instanceof rule_1.RuleCollection) {
            // Ensure that its rules all exist.
            this.getRules(rule.rules);
        }
        this._all.set(rule.code, rule);
    }
    /**
     * Given an array of string codes for registered rules and rule collections,
     * return the set of rules.
     */
    getRules(ruleCodes) {
        const results = new Set();
        this._getRules(ruleCodes, new Set(), results);
        return results;
    }
    _getRules(ruleCodes, alreadyExpanded, results) {
        ruleCodes = ruleCodes.filter((p) => !alreadyExpanded.has(p));
        for (const code of ruleCodes) {
            alreadyExpanded.add(code);
            const ruleOrCollection = this._all.get(code);
            if (ruleOrCollection == null) {
                throw new Error(`Could not find lint rule with code '${code}'`);
            }
            if (ruleOrCollection instanceof rule_1.Rule) {
                results.add(ruleOrCollection);
            }
            else {
                this._getRules(ruleOrCollection.rules, alreadyExpanded, results);
            }
        }
    }
    get allRules() {
        return Array.from(this._all.values())
            .filter((r) => r instanceof rule_1.Rule);
    }
    get allRuleCollections() {
        return Array.from(this._all.values())
            .filter((r) => r instanceof rule_1.RuleCollection);
    }
}
exports.LintRegistry = LintRegistry;
exports.registry = new LintRegistry();
//# sourceMappingURL=registry.js.map