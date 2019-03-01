## Pluggable [ESLint](http://eslint.org/docs/about/) [config](http://eslint.org/docs/developer-guide/shareable-configs) for [ECMAScript Next](https://kangax.github.io/compat-table/esnext) that you can import, extend and override

[![Join the chat at https://gitter.im/kunalgolani/eslint-config ][gitter-img]][gitter-url]
[![npm version][version-img]][npm-url]
[![npm downloads][downloads-img]][npm-url]
[![GitHub issues][issues-img]][issues-url]
[![Deps][deps-img]][deps-url]
[![Dev Deps][devdeps-img]][deps-url]

### ESNext Style Guide: for Consistency, Readability and more Brevity

#### Usage

In your js project directory:

```shell
npm install --save-dev eslint-config-esnext
```

And in your `.eslintrc.yaml`:

```yaml
extends:
  - esnext/style-guide
```

Alternatively, in your `.eslintrc.js` or `.eslintrc.json`:

```json
{
  "extends": ["esnext/style-guide"]
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
plugins:
  - babel
```

provides [some alternatives](https://github.com/babel/eslint-plugin-babel) to standard rules that are better compatible with babel-supported code

```yaml
rules:
```

selected [from here](http://eslint.org/docs/rules/), configured to:

- [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing): enforce spacing inside array brackets
- [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens): require parentheses around arrow function arguments, `as-needed`
- [`arrow-spacing`](http://eslint.org/docs/rules/arrow-spacing): enforce spacing before and after `=>` in arrow functions
- [`babel/generator-star-spacing`](https://github.com/babel/eslint-plugin-babel#rules): alternative to `generator-star-spacing` that handles `async` functions and `await` properly
- [`block-spacing`](http://eslint.org/docs/rules/block-spacing): enforce spacing inside single-line blocks
- [`brace-style`](http://eslint.org/docs/rules/brace-style): enforce [K&R brace style](https://www.wikiwand.com/en/Indent_style#/K.26R_style)
- [`camelcase`](http://eslint.org/docs/rules/camelcase): enforce camelcase naming convention, ignore object properties
- [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle): require trailing commas in multiline objects and arrays
- [`comma-spacing`](http://eslint.org/docs/rules/comma-spacing): disallow spacing before and enforce after commas
- [`comma-style`](http://eslint.org/docs/rules/comma-style): allow commas only after and on the same line as an array element, object property, or variable declaration
- [`computed-property-spacing`](http://eslint.org/docs/rules/computed-property-spacing): disallow spaces inside computed property brackets
- [`consistent-this`](http://eslint.org/docs/rules/consistent-this): allow `this` to only be assigned to a variable named `that`
- [`curly`](http://eslint.org/docs/rules/curly): require curly braces around blocks if they contain multiple statements, disallow braces if not
- [`dot-location`](http://eslint.org/docs/rules/dot-location): require the dot in a member expression to be on the same line as the property portion
- [`func-call-spacing`](http://eslint.org/docs/rules/func-call-spacing): disallow spacing between `function` identifiers and their invocations
- [`import/extensions`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md): ensure consistent use of file extensions in import paths
- [`import/imports-first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/imports-first.md): ensure all imports appear before other statements
- [`import/newline-after-import`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md): enforce a newline after import statements
- [`indent`](http://eslint.org/docs/rules/indent): enforce tabs ([w](http://programmers.stackexchange.com/a/72)[h](http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/)[y](https://news.ycombinator.com/item?id=11801496)?), `SwitchCase: 1`; override in your `.eslintrc` if you disagree
- [`key-spacing`](http://eslint.org/docs/rules/key-spacing): disallow spacing after keys and enforce spacing before values in object literal properties
- [`keyword-spacing`](http://eslint.org/docs/rules/keyword-spacing): enforce spacing before and after keywords
- [`linebreak-style`](http://eslint.org/docs/rules/linebreak-style): enforce unix linebreaks
- [`newline-per-chained-call`](http://eslint.org/docs/rules/newline-per-chained-call): require a newline after each call in a method chain exceeding 2 calls
- [`no-extra-parens`](http://eslint.org/docs/rules/no-extra-parens): disallow unnecessary parentheses; set to warn only
- [`no-multi-spaces`](http://eslint.org/docs/rules/no-multi-spaces): disallow multiple spaces that are not used for indentation
- [`no-trailing-spaces`](http://eslint.org/docs/rules/no-trailing-spaces): disallow trailing whitespace at the end of lines
- [`no-whitespace-before-property`](http://eslint.org/docs/rules/no-whitespace-before-property): disallow whitespace before properties
- [`object-curly-newline`](http://eslint.org/docs/rules/object-curly-newline): require that either both curly braces, or neither, directly enclose newlines
- [`object-curly-spacing`](http://eslint.org/docs/rules/object-curly-spacing): enforce spacing inside curly braces
- [`object-property-newline`](http://eslint.org/docs/rules/object-property-newline): enforce placing object properties on separate lines; set to warn only
- [`one-var-declaration-per-line`](http://eslint.org/docs/rules/one-var-declaration-per-line): require newlines around var initializations
- [`operator-linebreak`](http://eslint.org/docs/rules/operator-linebreak): require the line break to be placed before the operator
- [`quote-props`](http://eslint.org/docs/rules/quote-props): disallow unneeded quotes around object literal property names
- [`quotes`](http://eslint.org/docs/rules/quotes): enforce single quotes, while allowing template literals and double quotes to avoid escape characters
- [`rest-spread-spacing`](http://eslint.org/docs/rules/rest-spread-spacing): disallow spacing between rest and spread operators and their expressions
- [`semi`](http://eslint.org/docs/rules/semi): disallow semicolons ([w](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)[h](http://inimino.org/~inimino/blog/javascript_semicolons)[y](http://mislav.net/2010/05/semicolons/)?); override in your `.eslintrc` if you disagree
- [`semi-spacing`](http://eslint.org/docs/rules/semi-spacing): disallow spacing before and enforce after semicolons
- [`sort-imports`](http://eslint.org/docs/rules/sort-imports): enforce sorted import declarations within modules
- [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks): enforce spacing before blocks
- [`space-before-function-paren`](http://eslint.org/docs/rules/space-before-function-paren): enforce spacing before `function` definition opening parenthesis
- [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens): disallow spacing inside parentheses
- [`space-infix-ops`](http://eslint.org/docs/rules/space-infix-ops): require spacing around operators
- [`space-unary-ops`](http://eslint.org/docs/rules/space-unary-ops): require spacing between operand and unary word operators, disallow it between operand and unary non-word operator
- [`spaced-comment`](http://eslint.org/docs/rules/spaced-comment): enforce spacing after the `//` or `/*` in a comment
- [`template-curly-spacing`](http://eslint.org/docs/rules/template-curly-spacing): require spacing around embedded expressions of template strings
- [`valid-jsdoc`](http://eslint.org/docs/rules/valid-jsdoc): enforce valid JSDoc comments; set to warn only

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
