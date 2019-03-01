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
const parse5_1 = require("parse5");
const polymer_analyzer_1 = require("polymer-analyzer");
const rule_1 = require("../../html/rule");
const util_1 = require("../../html/util");
const registry_1 = require("../../registry");
const util_2 = require("../../util");
const p = dom5.predicates;
const styleModules = [
    {
        module: 'iron-flex',
        selector: util_1.elementSelectorToPredicate('.layout.horizontal, .layout.vertical, .layout.inline, .layout.wrap,' +
            '.layout.no-wrap, .layout.center, .layout.center-center, ' +
            '.layout.center-justified, .flex, .flex-auto, .flex-none', true)
    },
    {
        module: 'iron-flex-reverse',
        selector: util_1.elementSelectorToPredicate('.layout.horizontal-reverse, .layout.vertical-reverse, ' +
            '.layout.wrap-reverse', true)
    },
    {
        module: 'iron-flex-alignment',
        // Skip `.layout.center, .layout.center-center, .layout.center-justified`
        // as they're already defined in the `iron-flex` module.
        selector: util_1.elementSelectorToPredicate('.layout.start, .layout.end, .layout.baseline, .layout.start-justified, ' +
            '.layout.end-justified, .layout.around-justified, .layout.justified, ' +
            '.self-start, .self-center, .self-end, .self-stretch, .self-baseline, ' +
            '.layout.start-aligned, .layout.end-aligned, .layout.center-aligned, ' +
            '.layout.between-aligned, .layout.around-aligned', true)
    },
    {
        module: 'iron-flex-factors',
        // Skip `.flex` as it's already defined in the `iron-flex` module.
        selector: util_1.elementSelectorToPredicate('.flex-1, .flex-2, .flex-3, .flex-4, .flex-5, .flex-6, .flex-7, ' +
            '.flex-8, .flex-9, .flex-10, .flex-11, .flex-12', true)
    },
    {
        module: 'iron-positioning',
        // Skip `[hidden]` as it's a too generic selector.
        selector: util_1.elementSelectorToPredicate('.block, .invisible, .relative, .fit, body.fullbleed, ' +
            '.scroll, .fixed-bottom, .fixed-left, .fixed-top, .fixed-right', true)
    }
];
const styleModulesRegex = /iron-(flex|positioning)/;
const isStyleInclude = p.AND(p.hasTagName('style'), p.hasAttr('include'));
class IronFlexLayoutClasses extends rule_1.HtmlRule {
    constructor() {
        super(...arguments);
        this.code = 'iron-flex-layout-classes';
        this.description = util_2.stripIndentation(`
      Warns when iron-flex-layout classes are used without including the style modules.

      This:

          <link rel="import" href="../iron-flex-layout/iron-flex-layout-classes.html">
          <dom-module>
            <template>
              <style>
                :host { diplay: block; }
              </style>
              <div class="layout vertical">hello</div>
            </template>
          <dom-module>

      Should instead be written as:

          <link rel="import" href="../iron-flex-layout/iron-flex-layout-classes.html">
          <dom-module>
            <template>
              <style include="iron-flex">
                :host { diplay: block; }
              </style>
              <div class="layout vertical">hello</div>
            </template>
          <dom-module>
  `);
    }
    checkDocument(parsedDocument, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const warnings = [];
            // Search in the dom-modules.
            for (const domModule of document.getFeatures({ kind: 'dom-module' })) {
                const misplacedStyle = dom5.query(domModule.astNode.node, p.hasTagName('style'));
                if (misplacedStyle) {
                    warnings.push(new polymer_analyzer_1.Warning({
                        code: 'iron-flex-layout-classes',
                        message: `Style outside template. Run \`move-style-into-template\` rule.`,
                        parsedDocument,
                        severity: polymer_analyzer_1.Severity.ERROR,
                        sourceRange: parsedDocument.sourceRangeForStartTag(misplacedStyle)
                    }));
                    continue;
                }
                const template = dom5.query(domModule.astNode.node, p.hasTagName('template'));
                if (!template) {
                    continue;
                }
                const templateContent = parse5_1.treeAdapters.default.getTemplateContent(template);
                const fixIndex = warnings.length;
                const missingModules = getMissingStyleModules(parsedDocument, templateContent, warnings);
                if (!missingModules) {
                    continue;
                }
                // Add fix on first warning, we'll add all the missing modules in the same
                // style node.
                // TODO: we should not mutate warning.fix like this.
                const warning = warnings[fixIndex];
                // Fallback to style without include attribute.
                const styleNode = getStyleNodeWithInclude(templateContent) ||
                    dom5.query(templateContent, p.hasTagName('style'));
                if (!styleNode) {
                    const indent = util_1.getIndentationInside(templateContent);
                    warning.fix = [util_1.prependContentInto(parsedDocument, template, `
${indent}<style include="${missingModules}"></style>`)];
                }
                else if (dom5.hasAttribute(styleNode, 'include')) {
                    const include = dom5.getAttribute(styleNode, 'include');
                    warning.fix = [{
                            replacementText: `"${include} ${missingModules}"`,
                            range: parsedDocument.sourceRangeForAttributeValue(styleNode, 'include')
                        }];
                }
                else {
                    warning.fix = [util_1.addAttribute(parsedDocument, styleNode, 'include', missingModules)];
                }
            }
            const body = dom5.query(parsedDocument.ast, p.hasTagName('body'));
            // Handle files like `<dom-module></dom-module> <body><p>hello</p></body>`
            // where a "fake" body node would be created by dom-module. Skip these
            // cases, dear user please write proper HTML ¯\_(ツ)_/¯
            if (!body || !body.__location) {
                return warnings;
            }
            const fixIndex = warnings.length;
            const missingModules = getMissingStyleModules(parsedDocument, parsedDocument.ast, warnings);
            if (!missingModules) {
                return warnings;
            }
            // Add fix on first warning, we'll add all the missing modules in the same
            // style node.
            const warning = warnings[fixIndex];
            const styleNode = getStyleNodeWithInclude(parsedDocument.ast);
            if (styleNode) {
                const include = dom5.getAttribute(styleNode, 'include');
                warning.fix = [{
                        replacementText: `"${include} ${missingModules}"`,
                        range: parsedDocument.sourceRangeForAttributeValue(styleNode, 'include')
                    }];
            }
            else {
                const indent = util_1.getIndentationInside(body);
                warning.fix = [util_1.prependContentInto(parsedDocument, body, `
${indent}<custom-style>
${indent}  <style is="custom-style" include="${missingModules}"></style>
${indent}</custom-style>`)];
            }
            return warnings;
        });
    }
}
function getMissingStyleModules(parsedDocument, rootNode, warnings) {
    const { modules, includes } = searchUsedModulesAndIncludes(rootNode);
    let missingModules = '';
    for (const [module, nodes] of modules) {
        if (includes.indexOf(module) === -1) {
            warnings.push(...nodes.map((node) => new polymer_analyzer_1.Warning({
                code: 'iron-flex-layout-classes',
                message: `"${module}" style module is used but not imported.
Import it in the template style include.`,
                parsedDocument,
                severity: polymer_analyzer_1.Severity.WARNING,
                // Prefer warning on class$, as it will override any value of class.
                sourceRange: parsedDocument.sourceRangeForAttributeValue(node, `class${dom5.hasAttribute(node, 'class$') ? '$' : ''}`)
            })));
            missingModules += ' ' + module;
        }
    }
    return missingModules.trim();
}
function searchUsedModulesAndIncludes(rootNode, modules = new Map(), includes = []) {
    for (const node of dom5.depthFirst(rootNode)) {
        if (!dom5.isElement(node)) {
            continue;
        }
        // Ensure we don't search into dom-module's templates.
        if (p.hasTagName('template')(node) &&
            !p.hasTagName('dom-module')(node.parentNode)) {
            const templateContent = parse5_1.treeAdapters.default.getTemplateContent(node);
            searchUsedModulesAndIncludes(templateContent, modules, includes);
        }
        else if (isStyleInclude(node)) {
            dom5.getAttribute(node, 'include').split(' ').forEach((include) => {
                if (includes.indexOf(include) === -1) {
                    includes.push(include);
                }
            });
        }
        else {
            styleModules.forEach((m) => {
                if (m.selector(node)) {
                    if (!modules.has(m.module)) {
                        modules.set(m.module, [node]);
                    }
                    else {
                        modules.get(m.module).push(node);
                    }
                }
            });
        }
    }
    return { modules, includes };
}
function getStyleNodeWithInclude(node) {
    let styleToEdit = null;
    for (const style of dom5.queryAll(node, isStyleInclude)) {
        // Get the first one of the styles with include attribute, otherwise
        // prefer styles that already include iron-flex-layout modules.
        if (!styleToEdit ||
            styleModulesRegex.test(dom5.getAttribute(style, 'include'))) {
            styleToEdit = style;
        }
    }
    return styleToEdit;
}
registry_1.registry.register(new IronFlexLayoutClasses());
//# sourceMappingURL=iron-flex-layout-classes.js.map