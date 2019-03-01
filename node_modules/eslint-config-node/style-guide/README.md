## Pluggable [ESLint](http://eslint.org/docs/about/) [config](http://eslint.org/docs/developer-guide/shareable-configs) for [Node.js](https://nodejs.org) that you can import, extend and override

[![Join the chat at https://gitter.im/kunalgolani/eslint-config ][gitter-img]][gitter-url]
[![npm version][version-img]][npm-url]
[![npm downloads][downloads-img]][npm-url]
[![GitHub issues][issues-img]][issues-url]
[![Deps][deps-img]][deps-url]
[![Dev Deps][devdeps-img]][deps-url]

### Node.js Style Guide: for Consistency, Readability and more Brevity

#### Usage

In your js project directory:

```shell
npm install --save-dev eslint-config-node
```

And in your `.eslintrc.yaml`:

```yaml
extends:
  - node/style-guide
```

Alternatively, in your `.eslintrc.js` or `.eslintrc.json`:

```json
{
  "extends": ["node/style-guide"]
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
extends: esnext/style-guide
```

includes rules from [eslint-config-esnext/style-guide](https://github.com/kunalgolani/eslint-config/tree/master/packages/esnext/style-guide)

[gitter-img]: https://badges.gitter.im/kunalgolani/eslint-config.svg
[gitter-url]: https://gitter.im/kunalgolani/eslint-config?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[version-img]: https://img.shields.io/npm/v/eslint-config-node.svg
[npm-url]: https://www.npmjs.com/package/eslint-config-node
[downloads-img]: https://img.shields.io/npm/dt/eslint-config-node.svg
[issues-img]: https://img.shields.io/github/issues-raw/kunalgolani/eslint-config.svg?maxAge=2592000
[issues-url]: https://github.com/kunalgolani/eslint-config/issues
[deps-img]: https://img.shields.io/david/kunalgolani/eslint-config.svg
[devdeps-img]: https://img.shields.io/david/dev/kunalgolani/eslint-config.svg
[deps-url]: https://github.com/kunalgolani/eslint-config/blob/master/node/package.json
