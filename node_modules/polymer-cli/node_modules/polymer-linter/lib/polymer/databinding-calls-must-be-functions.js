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
const polymer_analyzer_1 = require("polymer-analyzer");
const registry_1 = require("../registry");
const rule_1 = require("../rule");
const util_1 = require("../util");
const definitelyNotMethodTypes = new Set(['string', 'number', 'boolean', 'Array']);
for (const type of [...definitelyNotMethodTypes]) {
    definitelyNotMethodTypes.add(`${type} | null | undefined`);
    definitelyNotMethodTypes.add(`${type} | null`);
    definitelyNotMethodTypes.add(`${type} | undefined`);
}
class DatabindingCallsMustBeFunctions extends rule_1.Rule {
    constructor() {
        super(...arguments);
        this.code = 'databinding-calls-must-be-functions';
        this.description = util_1.stripIndentation(`
      Warns when a property in a Polymer databinding is called but it isn't
      a function property on the element.

      e.g. it will warn about this:

          Polymer({
            observers: [
              'foo(bar)'
            ],
            properties: {
              foo: String,
              bar: Number
            }
          });

      but not this

          Polymer({
            observers: [
              'foo(bar)'
            ],
            properties: {
              bar: Number
            },
            foo(bar) { /* ... */}
          });
  `);
    }
    check(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const warnings = [];
            const elements = document.getFeatures({ kind: 'polymer-element' });
            for (const element of elements) {
                if (!element.tagName) {
                    continue;
                }
                const domModules = document.getFeatures({
                    kind: 'dom-module',
                    id: element.tagName,
                    imported: true,
                    externalPackages: true
                });
                let domModule = undefined;
                if (domModules.size === 1) {
                    domModule = domModules.values().next().value;
                }
                const mustBeMethods = [];
                if (domModule) {
                    for (const databinding of domModule.databindings) {
                        // If there's more than one property, then this must be a method call,
                        // and the first property must be the method name.
                        if (databinding.properties.length > 1) {
                            mustBeMethods.push(databinding.properties[0]);
                        }
                    }
                }
                for (const observer of element.observers) {
                    if (observer.parsedExpression &&
                        observer.parsedExpression.properties.length > 0) {
                        mustBeMethods.push(observer.parsedExpression.properties[0]);
                    }
                }
                for (const property of element.properties.values()) {
                    if (property.computedExpression &&
                        property.computedExpression.properties.length > 0) {
                        mustBeMethods.push(property.computedExpression.properties[0]);
                    }
                    if (property.observerExpression &&
                        property.observerExpression.properties.length > 0) {
                        mustBeMethods.push(property.observerExpression.properties[0]);
                    }
                }
                // Early exit if there's nothing to check.
                if (mustBeMethods.length === 0) {
                    continue;
                }
                const potentialMethodNames = new Set(Array.from(element.properties.values())
                    .filter((p) => !p.type || !definitelyNotMethodTypes.has(p.type))
                    .map((p) => p.name)
                    .concat([...element.methods.keys()]));
                const elementName = element.tagName || element.className || 'this element';
                for (const mustBeMethod of mustBeMethods) {
                    if (!potentialMethodNames.has(mustBeMethod.name)) {
                        warnings.push(new polymer_analyzer_1.Warning({
                            parsedDocument: document.parsedDocument,
                            code: this.code,
                            message: util_1.stripWhitespace(`
              ${mustBeMethod.name} is not a known method on ${elementName}`),
                            severity: polymer_analyzer_1.Severity.WARNING,
                            sourceRange: mustBeMethod.sourceRange
                        }));
                    }
                }
            }
            return warnings;
        });
    }
}
registry_1.registry.register(new DatabindingCallsMustBeFunctions());
//# sourceMappingURL=databinding-calls-must-be-functions.js.map