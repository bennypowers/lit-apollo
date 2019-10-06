/* eslint-disable no-loops/no-loops */

/**
 * Deduping Mixin
 * @type {WeakMap}
 * @license MIT
 * Copyright (c) 2019 ING Bank NV Amsterdam
 * See https://github.com/ing-bank/lion
 */

/**
 * Cache of applied class mixins, for later deduplication
 * @template TBase
 * @type {WeakMap<MixinFunction<TBase>, MixinFunction<TBase>>}
 */
const appliedClassMixins = new WeakMap();

/**
 * @param {Object} obj
 * @return {Array}
 */
function getPrototypeChain(obj) {
  const chain = [];
  let proto = obj;
  while (proto) {
    chain.push(proto);
    proto = Object.getPrototypeOf(proto);
  }
  return chain;
}

/**
 * @template TBase
 * @param {MixinFunction<TBase>} mixin
 * @param {TBase} superClass
 * @return {boolean}
 */
function wasApplied(mixin, superClass) {
  const classes = getPrototypeChain(superClass);
  return classes.reduce((res, klass) => res || appliedClassMixins.get(klass) === mixin, false);
}

/**
 * @template TBase
 * @typedef {(superclass: TBase) => TBase} MixinFunction
 */

/**
 * # dedupeMixin
 *
 * Imagine you are developing web components and creating ES classes for
 * Custom Elements. You have two generic mixins (let's say `M1` and `M2`) which
 * require independently the same even more generic mixin (`BaseMixin`).
 * `M1` and `M2` can be used independently, that means they have to inherit
 * from `BaseMixin` also independently. But they can be also used in combination.
 * Sometimes `M1` and `M2` are used in the same component and can mess up the
 * inheritance chain if `BaseMixin` is applied twice. In other words, this may happen
 * to the protoype chain `... -> M2 -> BaseMixin -> M1 -> BaseMixin -> ...`.
 *
 * An example of this may be a `LocalizeMixin` used across different components and mixins.
 * Some mixins may need it and many components need it too and can not rely on other mixins
 * to have it by default, so must inherit from it independently.
 *
 * The more generic the mixin is, the higher the chance of being applied more than once.
 * As a mixin author you can't control how it is used, and can't always predict it.
 * So as a safety measure it is always recommended to create deduping mixins.
 *
 * @function
 * @template TBase
 * @param {MixinFunction<TBase>} mixin
 * @return {MixinFunction<TBase>}
 *
 * @example
 * // makes a conventional ES mixin deduping
 * const BaseMixin = dedupeMixin((superClass) => {
 *   return class extends superClass { ... };
 * });
 *
 * // inherits from BaseMixin
 * const M1 = dedupeMixin((superClass) => {
 *   return class extends BaseMixin(superClass) { ... };
 * });
 *
 * // inherits from BaseMixin
 * const M2 = dedupeMixin((superClass) => {
 *   return class extends BaseMixin(superClass) { ... };
 * });
 *
 * // component inherits from M1
 * // MyCustomElement -> M1 -> BaseMixin -> BaseCustomElement;
 * class MyCustomElement extends M1(BaseCustomElement) { ... }
 *
 * // component inherits from M2
 * // MyCustomElement -> M2 -> BaseMixin -> BaseCustomElement;
 * class MyCustomElement extends M2(BaseCustomElement) { ... }
 *
 * // component inherits from both M1 and M2
 * // MyCustomElement -> M2 -> M1 -> BaseMixin -> BaseCustomElement;
 * class MyCustomElement extends M2(M1(BaseCustomElement)) { ... }
 */
export function dedupeMixin(mixin) {
  return superClass => {
    if (wasApplied(mixin, superClass)) {
      return superClass;
    }
    const mixedClass = mixin(superClass);
    appliedClassMixins.set(mixedClass, mixin);
    return mixedClass;
  };
}
