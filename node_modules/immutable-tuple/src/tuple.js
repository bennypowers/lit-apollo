// See [`lookup.js`](lookup.html).
import { lookup, lookupArray } from "./lookup.js";

// See [`util.js`](util.html).
import {
  brand,
  def,
  freeze,
  forEachArrayMethod,
} from "./util.js";

// When called with any number of arguments, this function returns an
// object that inherits from `tuple.prototype` and is guaranteed to be
// `===` any other `tuple` object that has exactly the same items. In
// computer science jargon, `tuple` instances are "internalized" or just
// "interned," which allows for constant-time equality checking, and makes
// it possible for tuple objects to be used as `Map` or `WeakMap` keys, or
// stored in a `Set`.
export default function tuple() {
  const node = lookup.apply(null, arguments);

  if (node.tuple) {
    return node.tuple;
  }

  const t = Object.create(tuple.prototype);

  // Define immutable items with numeric indexes, and permanently fix the
  // `.length` property.
  const argc = arguments.length;
  for (let i = 0; i < argc; ++i) {
    t[i] = arguments[i];
  }

  def(t, "length", argc, false);

  // Remember this new `tuple` object so that we can return the same object
  // earlier next time.
  return freeze(node.tuple = t);
}

// Named imports work as well as `default` imports.
export { tuple, lookup, lookupArray };

// Since the `immutable-tuple` package could be installed multiple times
// in an application, there is no guarantee that the `tuple` constructor
// or `tuple.prototype` will be unique, so `value instanceof tuple` is
// unreliable. Instead, to test if a value is a tuple, you should use
// `tuple.isTuple(value)`.
def(tuple.prototype, brand, true, false);
function isTuple(that) {
  return !! (that && that[brand] === true);
}

tuple.isTuple = isTuple;

function toArray(tuple) {
  const array = [];
  let i = tuple.length;
  while (i--) array[i] = tuple[i];
  return array;
}

// Copy all generic non-destructive Array methods to `tuple.prototype`.
// This works because (for example) `Array.prototype.slice` can be invoked
// against any `Array`-like object.
forEachArrayMethod((name, desc, mustConvertThisToArray) => {
  const method = desc && desc.value;
  if (typeof method === "function") {
    desc.value = function (...args) {
      const result = method.apply(
        mustConvertThisToArray ? toArray(this) : this,
        args
      );
      // Of course, `tuple.prototype.slice` should return a `tuple` object,
      // not a new `Array`.
      return Array.isArray(result) ? tuple(...result) : result;
    };
    Object.defineProperty(tuple.prototype, name, desc);
  }
});

// Like `Array.prototype.concat`, except for the extra effort required to
// convert any tuple arguments to arrays, so that
// ```
// tuple(1).concat(tuple(2), 3) === tuple(1, 2, 3)
// ```
const { concat } = Array.prototype;
tuple.prototype.concat = function (...args) {
  return tuple(...concat.apply(toArray(this), args.map(
    item => isTuple(item) ? toArray(item) : item
  )));
};
