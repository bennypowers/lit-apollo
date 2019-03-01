// See [`universal-weak-map.js`](universal-weak-map.html).
import { UniversalWeakMap } from "./universal-weak-map.js";

// See [`util.js`](util.html).
import { globalKey, def } from "./util.js";

// If this package is installed multiple times, there could be mutiple
// implementations of the `tuple` function with distinct `tuple.prototype`
// objects, but the shared pool of `tuple` objects must be the same across
// all implementations. While it would be ideal to use the `global`
// object, there's no reliable way to get the global object across all JS
// environments without using the `Function` constructor, so instead we
// use the global `Array` constructor as a shared namespace.
const root = Array[globalKey] || def(Array, globalKey, new UniversalWeakMap, false);

export function lookup() {
  return lookupArray(arguments);
}

export function lookupArray(array) {
  let node = root;

  // Because we are building a tree of *weak* maps, the tree will not
  // prevent objects in tuples from being garbage collected, since the
  // tree itself will be pruned over time when the corresponding `tuple`
  // objects become unreachable. In addition to internalization, this
  // property is a key advantage of the `immutable-tuple` package.
  const len = array.length;
  for (let i = 0; i < len; ++i) {
    const item = array[i];
    node = node.get(item) || node.set(item, new UniversalWeakMap);
  }

  // Return node.data rather than node itself to prevent tampering with
  // the UniversalWeakMap tree.
  return node.data || (node.data = Object.create(null));
}
