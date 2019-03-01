# immutable-tuple [![Build Status](https://travis-ci.org/benjamn/immutable-tuple.svg?branch=master)](https://travis-ci.org/benjamn/immutable-tuple)

Immutable finite list objects with constant-time equality testing (`===`) and no memory leaks.

## Installation

First install the package from npm:

```sh
npm install immutable-tuple
```

or clone it from GitHub and then run `npm install` to compile the source code:

```sh
git clone https://github.com/benjamn/immutable-tuple.git
cd immutable-tuple
npm install
npm test # if skeptical
```

## Usage

This package exports a single function called `tuple`, both as a `default` export and as an equivalent named export, so all of the following import styles will work:

```js
import tuple from "immutable-tuple";
import { tuple } from "immutable-tuple";
const { tuple } = require("immutable-tuple");
const tuple = require("immutable-tuple").tuple;
```

### Constructing `tuple`s

The `tuple` function takes any number of arguments and returns a unique, immutable object that inherits from `tuple.prototype` and is guaranteed to be `===` any other `tuple` object created from the same sequence of arguments:

```js
import assert from "assert";

const obj = { asdf: 1234 };
const t1 = tuple(1, "asdf", obj);
const t2 = tuple(1, "asdf", obj);

assert.strictEqual(t1 === t2, true);
assert.strictEqual(t1, t2);
```

Although the `tuple` function can be invoked using `new tuple(...)` syntax, using `new` is not recommended, since the new object will simply be thrown away.

### Own `tuple` properties

The `tuple` object has a fixed numeric `length` property, and its elements may be accessed using array index notation:

```js
assert.strictEqual(t1.length, 3);

t1.forEach((x, i) => {
  assert.strictEqual(x, t2[i]);
});
```

### Nested `tuple`s

Since `tuple` objects are just another kind of JavaScript object, naturally `tuple`s can contain other `tuple`s:

```js
assert.strictEqual(
  tuple(t1, t2),
  tuple(t2, t1)
);

assert.strictEqual(
  tuple(1, t2, 3)[1][2],
  obj
);
```

However, because tuples are immutable and always distinct from any of their arguments, it is not possible for a `tuple` to contain itself, nor to contain another `tuple` that contains the original `tuple`, and so forth.

### Constant time `===` equality

Since `tuple` objects are identical when (and only when) their elements are identical, any two tuples can be compared for equality in constant time, regardless of how many elements they contain.

This behavior also makes `tuple` objects useful as keys in a `Map`, or elements in a `Set`, without any extra hashing or equality logic:

```js
const map = new Map;

map.set(tuple(1, 12, 3), {
  author: tuple("Ben", "Newman"),
  releaseDate: Date.now()
});

const version = "1.12.3";
const info = map.get(tuple(...version.split(".").map(Number)));
if (info) {
  console.log(info.author[1]); // "Newman"
}
```

### `Array` methods

Every non-destructive method of `Array.prototype` is supported by `tuple.prototype`, including `sort` and `reverse`, which return a modified copy of the `tuple` without altering the original:

```js
assert.strictEqual(
  tuple("a", "b", "c").slice(1, -1),
  tuple("b")
);

assert.strictEqual(
  tuple(6, 2, 8, 1, 3, 0).sort(),
  tuple(0, 1, 2, 3, 6, 8)
);

assert.strictEqual(
  tuple(1).concat(2, tuple(3, 4), 5),
  tuple(1, 2, 3, 4, 5)
);
```

### Shallow immutability

While the identity, number, and order of elements in a `tuple` is fixed, please note that the contents of the individual elements are not frozen in any way:

```js
const obj = { asdf: 1234 };
tuple(1, "asdf", obj)[2].asdf = "oyez";
assert.strictEqual(obj.asdf, "oyez");
```

### Iterability

Every `tuple` object is array-like and iterable, so `...` spreading and destructuring work as they should:

```js
func(...tuple(a, b));
func.apply(this, tuple(c, d, e));

assert.deepEqual(
  [1, ...tuple(2, 3), 4],
  [1, 2, 3, 4]
);

assert.strictEqual(
  tuple(1, ...tuple(2, 3), 4),
  tuple(1, 2, 3, 4)
);

const [a, [_, b]] = tuple(1, tuple(2, 3), 4);
assert.strictEqual(a, 1);
assert.strictEqual(b, 3);
```

### `tuple.isTuple(value)`

Since the `immutable-tuple` package could be installed multiple times in an application, there is no guarantee that the `tuple` constructor or `tuple.prototype` will be unique, so `value instanceof tuple` is unreliable. Instead, to test if a value is a `tuple`, you should use `tuple.isTuple(value)`.

Fortunately, even if your application uses multiple different `tuple` constructors from different copies of this library, the resulting `tuple` instances will still be `===` each other when their elements are the same. This is especially convenient given that this library provides both a CommonJS bundle and an ECMAScript module bundle, and some module systems might accidentally load those bundles simultaneously.


## Implementation details

Thanks to [Docco](http://ashkenas.com/docco/), you can read my implementation comments side-by-side with the actual code by visiting [the GitHub pages site](https://benjamn.github.io/immutable-tuple/) for this repository.

### Instance pooling (internalization)

Any data structure that guarantees `===` equality based on structural equality must maintain some sort of internal pool of previously encountered instances.

Implementing such a pool for `tuple`s is fairly straightforward (though feel free to give it some thought before reading this code, if you like figuring things out for yourself):

```js
const pool = new Map;

function tuple(...items) {
  let node = pool; 

  items.forEach(item => {
    let child = node.get(item);
    if (!child) node.set(item, child = new Map);
    node = child;
  });

  // If we've created a tuple instance for this sequence of elements before,
  // return that instance again. Otherwise create a new immutable tuple instance
  // with the same (frozen) elements as the items array.
  return node.tuple || (node.tuple = Object.create(
    tuple.prototype,
    Object.getOwnPropertyDescriptors(Object.freeze(items))
  ));
}
```

This implementation is pretty good, because it requires only linear time (_O_(`items.length`)) to determine if a `tuple` has been created previously for the given `items`, and you can't do better than linear time (asymptotically speaking) because you have to look at all the items.

This code is also useful as an illustration of exactly how the `tuple` constructor behaves, in case you weren't satisfied by my examples in the previous section.

### Garbage collection

The simple implementation above has a serious problem: in a garbage-collected language like JavaScript, the `pool` itself will retain references to all `tuple` objects ever created, which prevents `tuple` objects and their elements (which may be very large objects) from ever being reclaimed by the garbage collector, even after they become unreachable by any other means. In other words, storing objects in this kind of `tuple` would inevitably cause **memory leaks**.

To solve this problem, it's tempting to try changing `Map` to [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) here:

```js
const pool = new WeakMap;
```

and here:

```js
if (!child) node.set(item, child = new WeakMap);
```

This approach is appealing because a `WeakMap` should allow its keys to be reclaimed by the garbage collector. That's the whole point of a `WeakMap`, after all. Once a `tuple` becomes unreachable because the program has stopped using it anywhere else, its elements are free to disappear from the pool of `WeakMap`s whenever they too become unreachable. In other words, something like a `WeakMap` is exactly what we need here.

Unfortunately, this strategy stumbles because a `tuple` can contain primitive values as well as object references, whereas a `WeakMap` only allows keys that are object references. In other words, `node.set(item, ...)` would fail whenever `item` is not an object, if `node` is a `WeakMap`. To see how the `immutable-tuple` library gets around this `WeakMap` limitation, have a look at [this module](https://benjamn.github.io/immutable-tuple/src/universal-weak-map.html).

Astute readers may object that some bookkeeping data remains in memory when you create `tuple` objects with prefixes of primitive values, but the important thing is that no user-defined objects are kept alive by the `pool`. That said, if you have any ideas for reclaiming chains of `._strongMap` data, please [open an issue](https://github.com/benjamn/immutable-tuple/issues/new) or [submit a pull request](https://github.com/benjamn/immutable-tuple/pulls)!
