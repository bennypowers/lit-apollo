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
class BehaviorsSpelling extends rule_1.Rule {
    constructor() {
        super(...arguments);
        this.code = 'behaviors-spelling';
        this.description = util_1.stripIndentation(`
      Warns when the Polymer \`behaviors\` property is spelled \`behaviours\`,
      as Polymer uses the American spelling.

          Polymer({
            behaviours: [...]
          });

      Accepted syntax:

          Polymer({
            behaviors: [...]
          });
  `);
    }
    check(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const warnings = [];
            const elements = document.getFeatures({ kind: 'polymer-element' });
            for (const element of elements) {
                const behavioursProperty = element.properties.get('behaviours');
                if (behavioursProperty && !behavioursProperty.published &&
                    behavioursProperty.sourceRange) {
                    warnings.push(new polymer_analyzer_1.Warning({
                        parsedDocument: document.parsedDocument,
                        code: this.code,
                        message: util_1.stripWhitespace(`
              "behaviours" property should be spelled "behaviors"`),
                        severity: polymer_analyzer_1.Severity.WARNING,
                        sourceRange: behavioursProperty.sourceRange
                    }));
                }
            }
            return warnings;
        });
    }
}
registry_1.registry.register(new BehaviorsSpelling());
//# sourceMappingURL=behaviors-spelling.js.map