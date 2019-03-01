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
const polymer_analyzer_1 = require("polymer-analyzer");
const rule_1 = require("../html/rule");
const util_1 = require("../html/util");
const registry_1 = require("../registry");
const util_2 = require("../util");
const p = dom5.predicates;
const isDomRepeat = p.OR(p.hasTagName('dom-repeat'), p.AND(p.hasTagName('template'), p.hasAttrValue('is', 'dom-repeat')));
class DatabindWithUnknownProperty extends rule_1.HtmlRule {
    constructor() {
        super(...arguments);
        this.code = 'databind-with-unknown-property';
        this.description = util_2.stripIndentation(`
      Warns when a polymer databinding expression uses an undeclared property.
  `);
    }
    checkDocument(parsedDocument, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const warnings = [];
            const domModules = document.getFeatures({ kind: 'dom-module' });
            for (const domModule of domModules) {
                const elements = document.getFeatures({
                    kind: 'element',
                    id: domModule.id,
                    imported: true,
                    externalPackages: true
                });
                if (elements.size !== 1) {
                    continue;
                }
                const element = elements.values().next().value;
                const explicitlyKnownProperties = new Set([
                    ...element.properties.keys(),
                    ...element.methods.keys(),
                    ...util_1.sharedProperties
                ]);
                const scopedProperties = [];
                const domRepeats = dom5.queryAll(domModule.astNode.node, isDomRepeat, dom5.childNodesIncludeTemplate);
                for (const domRepeat of domRepeats) {
                    const scope = parsedDocument.sourceRangeForNode(domRepeat);
                    const itemProperty = dom5.getAttribute(domRepeat, 'as') || 'item';
                    const indexProperty = dom5.getAttribute(domRepeat, 'index-as') || 'index';
                    scopedProperties.push({ scope, property: itemProperty });
                    scopedProperties.push({ scope, property: indexProperty });
                }
                const suspiciousPropertiesByName = new Map();
                for (const expression of domModule.databindings) {
                    for (const prop of expression.properties) {
                        if (explicitlyKnownProperties.has(prop.name)) {
                            continue;
                        }
                        let isScopedProperty = false;
                        for (const scopedProperty of scopedProperties) {
                            if (scopedProperty.property === prop.name &&
                                polymer_analyzer_1.isPositionInsideRange(prop.sourceRange.start, scopedProperty.scope)) {
                                isScopedProperty = true;
                            }
                        }
                        if (isScopedProperty) {
                            continue;
                        }
                        const props = suspiciousPropertiesByName.get(prop.name) || [];
                        props.push({ name: prop.name, sourceRange: prop.sourceRange, expression });
                        suspiciousPropertiesByName.set(prop.name, props);
                    }
                }
                // TODO(rictic): also validate computed properties and observers once
                //     https://github.com/Polymer/polymer-analyzer/pull/552 has
                //     landed.
                for (const usesOfProperty of suspiciousPropertiesByName.values()) {
                    const firstUse = usesOfProperty[0];
                    if (!firstUse) {
                        throw new Error('This should never happen');
                    }
                    if (usesOfProperty.length === 1) {
                        const bestGuess = util_2.closestSpelling(firstUse.name, explicitlyKnownProperties).min;
                        warnings.push(new polymer_analyzer_1.Warning({
                            parsedDocument,
                            code: this.code,
                            severity: polymer_analyzer_1.Severity.WARNING,
                            sourceRange: firstUse.sourceRange,
                            message: `${firstUse.name} is not declared or used more than once. ` +
                                `Did you mean: ${bestGuess}`
                        }));
                        continue;
                    }
                    const hasWrite = !!usesOfProperty.find((use) => {
                        // We're writing into a property if it's on an attribute (not e.g. a
                        // text node), if it's a bidirectional binding, and it's the only
                        // property in the expression. (this isn't perfect, it misses some
                        // strange stuff with literals like foo(10, 20) but it's good enough.)
                        return use.expression instanceof polymer_analyzer_1.AttributeDatabindingExpression &&
                            use.expression.direction === '{' &&
                            use.expression.isCompleteBinding &&
                            use.expression.properties.length === 1;
                    });
                    // TODO(rictic): when we add the ability to configure a lint pass we
                    //     should allow users to force all properties to be declared.
                    if (hasWrite) {
                        continue;
                    }
                    for (const use of usesOfProperty) {
                        warnings.push(new polymer_analyzer_1.Warning({
                            parsedDocument,
                            code: this.code,
                            severity: polymer_analyzer_1.Severity.WARNING,
                            sourceRange: use.sourceRange,
                            message: `${use.name} is not declared and is only read from, ` +
                                `never written to. If it's part of the element's API ` +
                                `it should be a declared property.`
                        }));
                    }
                }
            }
            return warnings;
        });
    }
}
registry_1.registry.register(new DatabindWithUnknownProperty());
//# sourceMappingURL=databind-with-unknown-property.js.map