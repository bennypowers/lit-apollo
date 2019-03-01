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
const matchers_1 = require("./matchers");
class SetUnknownAttribute extends rule_1.HtmlRule {
    constructor() {
        super(...arguments);
        this.code = 'set-unknown-attribute';
        this.description = util_2.stripIndentation(`
      Warns when setting undeclared properties or attributes in HTML.

      This rule will check use of attributes in HTML on custom elements, as well
      as databinding into attributes and properties in polymer databinding
      contexts.

      This catches misspellings, forgetting to convert camelCase to kebab-case,
      and binding to attributes like class and style like they were properties.

      Currently only checks custom elements, as we don't yet have the necessary
      metadata on native elements in a convenient format.
  `);
    }
    checkDocument(parsedDoc, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const warnings = [];
            // It doesn't matter right now, as there's no way to have an inline html
            // document, but this query should specify that it doesn't want to match
            // inline documents.
            const elementReferences = document.getFeatures({ kind: 'element-reference' });
            if (elementReferences.size === 0) {
                return [];
            }
            const databindingRanges = [...dom5.queryAll(parsedDoc.ast, matchers_1.isDatabindingTemplate)].map((t) => parsedDoc.sourceRangeForNode(t));
            for (const ref of elementReferences) {
                const node = ref.astNode.node;
                if (!node || !node.tagName) {
                    continue;
                }
                const elements = document.getFeatures({
                    kind: 'element',
                    id: node.tagName,
                    imported: true,
                    externalPackages: true
                });
                if (elements.size !== 1) {
                    continue;
                }
                const element = elements.values().next().value;
                for (const attr of node.attrs || []) {
                    let name = attr.name;
                    let isAttribute = true;
                    // It's a databinding if it matches the regex and the reference is
                    // contained within a databinding template.
                    const isFullDataBinding = /^(({{.*}})|(\[\[.*\]\]))$/.test(attr.value) &&
                        !!databindingRanges.find((r) => polymer_analyzer_1.isPositionInsideRange(ref.sourceRange.start, r));
                    if (isFullDataBinding) {
                        if (name.endsWith('$')) {
                            name = name.slice(0, name.length - 1);
                        }
                        else {
                            isAttribute = false;
                            name = name.replace(/-(.)/g, (v) => v[1].toUpperCase());
                        }
                    }
                    // This is an open namespace.
                    if (attr.name.startsWith('data-')) {
                        if (!isAttribute) {
                            warnings.push(new polymer_analyzer_1.Warning({
                                parsedDocument: parsedDoc,
                                code: this.code,
                                message: util_2.stripWhitespace(`
                  data-* attributes must be accessed as attributes.
                  i.e. you must write:  ${attr.name}$="${attr.value}"`),
                                severity: polymer_analyzer_1.Severity.ERROR,
                                sourceRange: parsedDoc.sourceRangeForAttributeName(node, attr.name)
                            }));
                        }
                        continue;
                    }
                    if (name.startsWith('on')) {
                        // TODO(https://github.com/Polymer/polymer-linter/issues/34)
                        continue;
                    }
                    const allowedBindings = isAttribute ?
                        [...element.attributes.values()] :
                        [...element.properties.values()];
                    const shared = isAttribute ? util_1.sharedAttributes : util_1.sharedProperties;
                    const found = shared.has(name) || !!allowedBindings.find((b) => b.name === name);
                    // This works for both attributes and properties, but warning for
                    // unknown attributes is too noisy for most, and it has lots of totally
                    // legitimate uses.
                    // TODO(rictic): once we've got per-rule settings piped in, checking
                    //     attributes  should be an option. Maybe also as part of a
                    //     strict databinding collection?
                    if (!found && !isAttribute) {
                        const suggestion = closestOption(name, isAttribute, element);
                        if (isFullDataBinding && suggestion.attribute) {
                            suggestion.name += '$';
                        }
                        const bindingType = isAttribute ? 'an attribute' : 'a property';
                        warnings.push(new polymer_analyzer_1.Warning({
                            parsedDocument: parsedDoc,
                            code: this.code,
                            message: util_2.stripWhitespace(`${node.tagName} elements do not have ${bindingType} ` +
                                `named ${name}. Consider instead:  ${suggestion.name}`),
                            severity: polymer_analyzer_1.Severity.WARNING,
                            sourceRange: parsedDoc.sourceRangeForAttributeName(node, attr.name)
                        }));
                    }
                }
            }
            return warnings;
        });
    }
}
function closestOption(name, isAttribute, element) {
    const attributeOptions = [...element.attributes.keys(), ...util_1.sharedAttributes.keys()];
    const propertyOptions = [...element.properties.keys(), ...util_1.sharedProperties.keys()];
    const closestAttribute = util_2.closestSpelling(name, attributeOptions);
    const closestProperty = util_2.closestSpelling(name, propertyOptions);
    if (closestAttribute.minScore === closestProperty.minScore) {
        if (isAttribute) {
            return { attribute: true, name: closestAttribute.min };
        }
        return { attribute: false, name: closestProperty.min };
    }
    if (closestAttribute.minScore < closestProperty.minScore) {
        return { attribute: true, name: closestAttribute.min };
    }
    else {
        return { attribute: false, name: closestProperty.min };
    }
}
registry_1.registry.register(new SetUnknownAttribute());
//# sourceMappingURL=set-unknown-attribute.js.map