## Pluggable [ESLint](http://eslint.org/docs/about/) [config](http://eslint.org/docs/developer-guide/shareable-configs) for [ECMAScript Next](https://kangax.github.io/compat-table/esnext) that you can import, extend and override

[![Join the chat at https://gitter.im/kunalgolani/eslint-config ][gitter-img]][gitter-url]
[![npm version][version-img]][npm-url]
[![npm downloads][downloads-img]][npm-url]
[![GitHub issues][issues-img]][issues-url]
[![Deps][deps-img]][deps-url]
[![Dev Deps][devdeps-img]][deps-url]

### ESNext: Safety Checks and Best Practices with a bias toward code concision / brevity

#### Usage

In your js project directory:

```shell
npm install --save-dev eslint-config-esnext
```

<!--
If your environments node.js version is less than `5.0` or your npm version is lower than `3.0`, you may also need to install:

```shell
npm install --save-dev babel-eslint eslint-plugin-babel
```
-->

And in your `.eslintrc.yaml`:

```yaml
extends:
  - esnext
```

Alternatively, in your `.eslintrc.js` or `.eslintrc.json`:

```json
{
  "extends": ["esnext"]
}
```

To add a git-hook to your commits, consider using [husky](https://github.com/typicode/husky)

```shell
npm install --save-dev husky
```

And in your `package.json`:

```json
  "scripts": {
    "precommit": "eslint ."
  }
```

---

#### Config

This config is biased and opinionated, and errs on the side of too many rules instead of too few. Think of this as a superset of your repo's lint config, and discard what you don't like in it. It's easy to override and disable the rules you find inconvenient.

```yaml
env:
  es6: true
  commonjs: true
```

[enables](http://eslint.org/docs/user-guide/configuring#specifying-environments) [ES6 features](https://github.com/lukehoban/es6features#readme) and [CommonJS modules](https://www.wikiwand.com/en/CommonJS)

```yaml
parser: babel-eslint
```

[enables parsing](https://github.com/babel/babel-eslint) all [babel](https://babeljs.io/) [supported code](https://babeljs.io/docs/plugins/)

```yaml
parserOptions:
  ecmaVersion: 7
  sourceType: module
  ecmaFeatures:
    impliedStrict: true
    modules: true
    experimentalObjectRestSpread: true
```

allows [es2015 modules](https://github.com/ModuleLoader/es6-module-loader/wiki/Brief-Overview-of-ES6-Module-syntax) and [es2016 object rest and spread](https://github.com/sebmarkbage/ecmascript-rest-spread) [to be parsed](http://eslint.org/docs/user-guide/configuring#specifying-parser-options), and applies [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) to all js code

```yaml
extends:
  - eslint:recommended
  - plugin:import/errors
  - plugin:import/warnings
```

includes the following rules:

- [`constructor-super`](http://eslint.org/docs/rules/constructor-super): require `super()` calls in constructors
- [`for-direction`](http://eslint.org/docs/rules/for-direction): enforce that a for loop update clause moves the counter in the right direction
- [`getter-return`](http://eslint.org/docs/rules/getter-return): enforce that a return statement is present in property getters
- [`no-case-declarations`](http://eslint.org/docs/rules/no-case-declarations): disallow `let`, `const`, `function` and `class` declarations in `case` / `default` clauses inside `switch` blocks
- [`no-class-assign`](http://eslint.org/docs/rules/no-class-assign): disallow reassigning variables declared as classes
- [`no-compare-neg-zero`](http://eslint.org/docs/rules/no-compare-neg-zero): disallow comparing against -0
- [`no-cond-assign`](http://eslint.org/docs/rules/no-cond-assign): disallow assignment operators in conditional expressions
- [`no-console`](http://eslint.org/docs/rules/no-console): disallow the use of `console`
- [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign): disallow reassigning `const` variables
- [`no-constant-condition`](http://eslint.org/docs/rules/no-constant-condition): disallow constant expressions in conditions
- [`no-control-regex`](http://eslint.org/docs/rules/no-control-regex): disallow control characters in regular expressions
- [`no-debugger`](http://eslint.org/docs/rules/no-debugger): disallow the use of `debugger`
- [`no-delete-var`](http://eslint.org/docs/rules/no-delete-var): disallow deleting variables
- [`no-dupe-args`](http://eslint.org/docs/rules/no-dupe-args): disallow duplicate arguments in `function` definitions
- [`no-dupe-class-members`](http://eslint.org/docs/rules/no-dupe-class-members): disallow duplicate class members
- [`no-dupe-keys`](http://eslint.org/docs/rules/no-dupe-keys): disallow duplicate keys in object literals
- [`no-duplicate-case`](http://eslint.org/docs/rules/no-duplicate-case): disallow duplicate case labels
- [`no-empty`](http://eslint.org/docs/rules/no-empty): disallow empty block statements
- [`no-empty-character-class`](http://eslint.org/docs/rules/no-empty-character-class): disallow empty character classes in regular expressions
- [`no-empty-pattern`](http://eslint.org/docs/rules/no-empty-pattern): disallow empty destructuring patterns
- [`no-ex-assign`](http://eslint.org/docs/rules/no-ex-assign): disallow reassigning exceptions in `catch` clauses
- [`no-extra-boolean-cast`](http://eslint.org/docs/rules/no-extra-boolean-cast): disallow unnecessary boolean casts
- [`no-extra-semi`](http://eslint.org/docs/rules/no-extra-semi): disallow unnecessary semicolons
- [`no-fallthrough`](http://eslint.org/docs/rules/no-fallthrough): disallow fallthrough of `case` statements
- [`no-func-assign`](http://eslint.org/docs/rules/no-func-assign): disallow reassigning `function` declarations
- [`no-inner-declarations`](http://eslint.org/docs/rules/no-inner-declarations): disallow `function` or `var` declarations in nested blocks
- [`no-invalid-regexp`](http://eslint.org/docs/rules/no-invalid-regexp): disallow invalid regular expression strings in `RegExp` constructors
- [`no-irregular-whitespace`](http://eslint.org/docs/rules/no-irregular-whitespace): disallow irregular whitespace outside of strings and comments
- [`no-mixed-spaces-and-tabs`](http://eslint.org/docs/rules/no-mixed-spaces-and-tabs): disallow mixed spaces and tabs for indentation
- [`no-new-symbol`](http://eslint.org/docs/rules/no-new-symbol): disallow `new` operators with the `Symbol` object
- [`no-obj-calls`](http://eslint.org/docs/rules/no-obj-calls): disallow calling global object properties as functions
- [`no-octal`](http://eslint.org/docs/rules/no-octal): disallow octal literals
- [`no-redeclare`](http://eslint.org/docs/rules/no-redeclare): disallow `var` redeclaration
- [`no-regex-spaces`](http://eslint.org/docs/rules/no-regex-spaces): disallow multiple spaces in regular expression literals
- [`no-self-assign`](http://eslint.org/docs/rules/no-self-assign): disallow assignments where both sides are exactly the same
- [`no-sparse-arrays`](http://eslint.org/docs/rules/no-sparse-arrays): disallow sparse arrays
- [`no-this-before-super`](http://eslint.org/docs/rules/no-this-before-super): disallow `this`/`super` before calling `super()` in constructors
- [`no-undef`](http://eslint.org/docs/rules/no-undef): disallow the use of undeclared variables unless mentioned in `/-global -/` comments
- [`no-unexpected-multiline`](http://eslint.org/docs/rules/no-unexpected-multiline): disallow multiline expressions likely to cause [ASI](http://inimino.org/~inimino/blog/javascript_semicolons) errors
- [`no-unreachable`](http://eslint.org/docs/rules/no-unreachable): disallow unreachable code after `return`, `throw`, `continue`, and `break` statements
- [`no-unsafe-finally`](http://eslint.org/docs/rules/no-unsafe-finally): disallow control flow statements in `finally` blocks
- [`no-unused-labels`](http://eslint.org/docs/rules/no-unused-labels): disallow unused [labels](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/label)
- [`no-unused-vars`](http://eslint.org/docs/rules/no-unused-vars): disallow unused variables
- [`no-useless-escape`](http://eslint.org/docs/rules/no-useless-escape): disallow unnecessary escape characters
- [`require-yield`](http://eslint.org/docs/rules/require-yield): require generator functions to contain `yield`
- [`use-isnan`](http://eslint.org/docs/rules/use-isnan): disallow comparisons with `NaN`, requiring calls to `isNaN()` instead
- [`valid-typeof`](http://eslint.org/docs/rules/valid-typeof): enforce comparing `typeof` expressions against valid type strings

- [`import/no-unresolved`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md): ensure imports point to a file/module that can be resolved
- [`import/named`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md): ensure named imports correspond to a named export in the remote file
- [`import/namespace`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md): ensure imported namespaces contain dereferenced properties as they are dereferenced
- [`import/default`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md): ensure a default export is present, given a default import
- [`import/export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/expor.md): report any invalid exports, i.e. re-export of the same name

- [`import/no-named-as-default`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md): report use of exported name as identifier of default export; set to warn only
- [`import/no-named-as-default-member`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md): report use of exported name as property of default export; set to warn only

```yaml
rules:
```

selected [from here](http://eslint.org/docs/rules/), configured to:

- [`array-callback-return`](http://eslint.org/docs/rules/array-callback-return): enforce `return` statements in callbacks to array prototype methods such as `map`, `reduce`, `find` etc.
- [`arrow-body-style`](http://eslint.org/docs/rules/arrow-body-style): require braces around arrow function bodies, `as-needed`
- [`class-methods-use-this`](http://eslint.org/docs/rules/class-methods-use-this): disallow class methods that don't use `this`
- [`dot-notation`](http://eslint.org/docs/rules/dot-notation): enforce dot notation for accessing object properties whenever possible
- [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq): prefer `===` and `!==` over `==` and `!=`
- [`import/no-amd`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md): report AMD `require` and `define` calls
- [`import/no-commonjs`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md): report CommonJS `require` calls and `module.exports` or `exports.*`
- [`import/no-duplicates`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md): report repeated import of the same module in multiple places
- [`import/no-extraneous-dependencies`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md): forbid the use of extraneous packages
- [`import/no-mutable-exports`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md): forbid the use of mutable exports with `var` or `let`
- [`import/no-namespace`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-namespace.md): report namespace imports
- [`import/no-nodejs-modules`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md): disallow node.js builtin modules
- [`import/prefer-default-export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md): prefer a default export if module exports a single name
- [`no-alert`](http://eslint.org/docs/rules/no-alert): disallow the use of `alert`, `confirm`, and `prompt`
- [`no-constant-condition`](http://eslint.org/docs/rules/no-constant-condition): override `eslint:recommended` with `checkLoops: false` to avoid errors in infinite [generators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*)
- [`no-duplicate-imports`](http://eslint.org/docs/rules/no-duplicate-imports): disallow duplicate module imports
- [`no-empty-function`](http://eslint.org/docs/rules/no-empty-function): disallow empty functions
- [`no-else-return`](http://eslint.org/docs/rules/no-else-return): disallow `else` blocks after `return` statements in `if` blocks
- [`no-eval`](http://eslint.org/docs/rules/no-eval): disallow the use of `eval()`
- [`no-extend-native`](http://eslint.org/docs/rules/no-extend-native): disallow extending built-in or native objects
- [`no-extra-bind`](http://eslint.org/docs/rules/no-extra-bind): disallow binding functions that don't use `this`
- [`no-global-assign`](http://eslint.org/docs/rules/no-global-assign): disallow assignments to native objects or read-only global variables
- [`no-implicit-globals`](http://eslint.org/docs/rules/no-implicit-globals): disallow `var` and named `function` declarations in the global scope, doesn't apply to modules
- [`no-implied-eval`](http://eslint.org/docs/rules/no-implied-eval): disallow the use of eval()-like methods
- [`no-invalid-this`](http://eslint.org/docs/rules/no-invalid-this): disallow `this` outside of constructors, classes or methods
- [`no-lonely-if`](http://eslint.org/docs/rules/no-lonely-if): disallow `if` statements as the only statement in `else` blocks
- [`no-loop-func`](http://eslint.org/docs/rules/no-loop-func): disallow `function`s inside loops
- [`no-new`](http://eslint.org/docs/rules/no-new): disallow `new` operators outside of assignments or comparisons
- [`no-new-func`](http://eslint.org/docs/rules/no-new-func): disallow creating functions with the `Function` constructor
- [`no-new-wrappers`](http://eslint.org/docs/rules/no-new-wrappers): disallow creating objects with the `String`, `Number`, and `Boolean` constructors
- [`no-proto`](http://eslint.org/docs/rules/no-proto): disallow use of the `__proto__` property
- [`no-script-url`](http://eslint.org/docs/rules/no-script-url): disallow `javascript:` urls
- [`no-self-compare`](http://eslint.org/docs/rules/no-self-compare): disallow comparisons where both sides are exactly the same
- [`no-throw-literal`](http://eslint.org/docs/rules/no-throw-literal): disallow throwing literals as exceptions
- [`no-unmodified-loop-condition`](http://eslint.org/docs/rules/no-unmodified-loop-condition): enforce updating the loop condition in each iteration
- [`no-unneeded-ternary`](http://eslint.org/docs/rules/no-unneeded-ternary): disallow ternary operators when simpler alternatives exist; `defaultAssignment: false` prefers `||` for default assignments
- [`no-unsafe-negation`](http://eslint.org/docs/rules/no-unsafe-negation): disallow negating the left operand of relational operators like `in` and `instanceof`
- [`no-unused-expressions`](http://eslint.org/docs/rules/no-unused-expressions): disallow expressions that have no effect on the state of the program, with `allowShortCircuit: true` and `allowTernary: true` allowing `&&`, `||` and the ternary operator as shorthands for `if` and `else`
- [`no-use-before-define`](http://eslint.org/docs/rules/no-use-before-define): disallow the use of variables before they are defined; `nofunc` ignores `function` declarations since they're hoisted
- [`no-useless-call`](http://eslint.org/docs/rules/no-useless-call): disallow unnecessary `.call()` and `.apply()`
- [`no-useless-computed-key`](http://eslint.org/docs/rules/no-useless-computed-key): disallow unnecessary computed property keys in object literals
- [`no-useless-concat`](http://eslint.org/docs/rules/no-useless-concat): disallow unnecessary concatenation of literals or template literals
- [`no-useless-constructor`](http://eslint.org/docs/rules/no-useless-constructor): disallow unnecessary constructors
- [`no-useless-rename`](http://eslint.org/docs/rules/no-useless-rename): disallow renaming `import`, `export`, and destructured assignments to the same name
- [`no-var`](http://eslint.org/docs/rules/no-var): require `let` or `const` instead of `var`
- [`no-with`](http://eslint.org/docs/rules/no-with): disallow `with` statements
- [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand): require method and property shorthand syntax for object literals
- [`operator-assignment`](http://eslint.org/docs/rules/operator-assignment): require assignment operator shorthand where possible
- [`prefer-arrow-callback`](http://eslint.org/docs/rules/prefer-arrow-callback): require callbacks to be arrow functions
- [`prefer-const`](http://eslint.org/docs/rules/prefer-const): require `const` declarations for variables that are never reassigned after declared
- [`prefer-rest-params`](http://eslint.org/docs/rules/prefer-rest-params): require rest parameters instead of `arguments`
- [`prefer-spread`](http://eslint.org/docs/rules/prefer-spread): require spread operator instead of `.apply()`

---

### [ESNext Style Guide](https://github.com/kunalgolani/eslint-config/tree/master/packages/esnext/style-guide)

[gitter-img]: https://badges.gitter.im/kunalgolani/eslint-config.svg
[gitter-url]: https://gitter.im/kunalgolani/eslint-config?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[version-img]: https://img.shields.io/npm/v/eslint-config-esnext.svg
[npm-url]: https://www.npmjs.com/package/eslint-config-esnext
[downloads-img]: https://img.shields.io/npm/dt/eslint-config-esnext.svg
[issues-img]: https://img.shields.io/github/issues-raw/kunalgolani/eslint-config.svg?maxAge=2592000
[issues-url]: https://github.com/kunalgolani/eslint-config/issues
[deps-img]: https://img.shields.io/david/kunalgolani/eslint-config.svg
[devdeps-img]: https://img.shields.io/david/dev/kunalgolani/eslint-config.svg
[deps-url]: https://github.com/kunalgolani/eslint-config/blob/master/esnext/package.json
