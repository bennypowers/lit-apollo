"use strict";
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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
const babel_traverse_1 = require("babel-traverse");
const babel = require("babel-types");
const polymer_analyzer_1 = require("polymer-analyzer");
const registry_1 = require("../registry");
const rule_1 = require("../rule");
const util_1 = require("../util");
const validate = require("validate-element-name");
class ValidateElementName extends rule_1.Rule {
    constructor() {
        super(...arguments);
        this.code = 'validate-element-name';
        this.description = util_1.stripIndentation(`
      Warns for invalid element names.
  `);
    }
    check(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const warnings = [];
            const elements = document.getFeatures({ kind: 'polymer-element' });
            if (elements.size === 0) {
                return warnings;
            }
            for (const el of elements) {
                if (el.tagName === undefined) {
                    continue;
                }
                const containingDoc = util_1.getDocumentContaining(el.sourceRange, document);
                if (containingDoc === undefined) {
                    continue;
                }
                const validationResult = validate(el.tagName);
                if (validationResult.isValid && validationResult.message === undefined) {
                    continue; // Valid element
                }
                if (el.astNode === undefined || el.astNode.language !== 'js') {
                    continue;
                }
                const isP2 = babel.isClassDeclaration(el.astNode.node);
                let sourceRange = el.sourceRange;
                babel_traverse_1.default(el.astNode.node, {
                    noScope: true,
                    ObjectProperty(path) {
                        if (isP2) {
                            return;
                        }
                        if (babel.isIdentifier(path.node.key) &&
                            path.node.key.name === 'is' &&
                            babel.isStringLiteral(path.node.value)) {
                            sourceRange = containingDoc.sourceRangeForNode(path.node.value);
                        }
                    },
                    ClassMethod(path) {
                        if (!isP2) {
                            return;
                        }
                        if (babel.isIdentifier(path.node.key) &&
                            path.node.key.name === 'is' && path.node.kind === 'get' &&
                            path.node.static) {
                            const body = path.node.body.body[0];
                            if (babel.isReturnStatement(body) &&
                                babel.isStringLiteral(body.argument)) {
                                sourceRange = containingDoc.sourceRangeForNode(body.argument);
                            }
                        }
                    }
                });
                if (sourceRange === undefined) {
                    continue;
                }
                const isError = !validationResult.isValid;
                warnings.push(new polymer_analyzer_1.Warning({
                    parsedDocument: document.parsedDocument,
                    code: isError ? 'invalid-element-name' :
                        'potential-element-naming-issue',
                    severity: isError ? polymer_analyzer_1.Severity.ERROR : polymer_analyzer_1.Severity.WARNING,
                    sourceRange: sourceRange,
                    message: validationResult.message
                }));
            }
            return warnings;
        });
    }
}
registry_1.registry.register(new ValidateElementName());
//# sourceMappingURL=validate-element-name.js.map