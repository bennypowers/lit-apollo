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
import { Directive, NodePart } from '../lit-html.js';
export declare type KeyFn<T> = (item: T, index?: number) => any;
export declare type ItemTemplate<T> = (item: T, index?: number) => any;
/**
 * A directive that repeats a series of values (usually `TemplateResults`)
 * generated from an iterable, and updates those items efficiently when the
 * iterable changes based on user-provided `keys` associated with each item.
 *
 * Note that if a `keyFn` is provided, strict key-to-DOM mapping is maintained,
 * meaning previous DOM for a given key is moved into the new position if
 * needed, and DOM will never be reused with values for different keys (new DOM
 * will always be created for new keys). This is generally the most efficient
 * way to use `repeat` since it performs minimum unnecessary work for insertions
 * amd removals.
 *
 * IMPORTANT: if providing a `keyFn`, keys *must* be unique for all items in a
 * given call to `repeat`. The behavior when providing duplicate keys is
 * undefined.
 *
 * If no `keyFn` is provided, this directive will perform similar to mapping
 * items to values, and DOM will be reused against potentially different items.
 */
export declare function repeat<T>(items: Iterable<T>, keyFn: KeyFn<T>, template: ItemTemplate<T>): Directive<NodePart>;
export declare function repeat<T>(items: Iterable<T>, template: ItemTemplate<T>): Directive<NodePart>;
//# sourceMappingURL=repeat.d.ts.map