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
import { AttributePart, Directive } from '../lit-html.js';
export interface StyleInfo {
    [name: string]: string;
}
/**
 * A directive that applies CSS properties. This must be used in the `style`
 * attribute and must be the only part used in the attribute. It takes the
 * property names in the `styleInfo` object and adds the property values as a
 * css style propertes. For example `{backgroundColor: 'red', borderTop: '5px'}`
 * sets these properties to the element's style.
 * @param styleInfo {StyleInfo}
 */
export declare const styleMap: (styleInfo: StyleInfo) => Directive<AttributePart>;
//# sourceMappingURL=styleMap.d.ts.map