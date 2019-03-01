## Pluggable [ESLint](http://eslint.org/docs/about/) [config](http://eslint.org/docs/developer-guide/shareable-configs) for [React Native](https://facebook.github.io/react-native) that you can import, extend and override

[![Join the chat at https://gitter.im/kunalgolani/eslint-config ][gitter-img]][gitter-url]
[![npm version][version-img]][npm-url]
[![npm downloads][downloads-img]][npm-url]
[![GitHub issues][issues-img]][issues-url]
[![Deps][deps-img]][deps-url]
[![Dev Deps][devdeps-img]][deps-url]

### React Native Style Guide: for Consistency, Readability and more Brevity

#### Usage

In your js project directory:

```shell
npm install --save-dev eslint-config-react-native
```

And in your `.eslintrc.yaml`:

```yaml
extends:
  - react-native/style-guide
```

Alternatively, in your `.eslintrc.js` or `.eslintrc.json`:

```json
{
  "extends": ["react-native/style-guide"]
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

```yaml
rules:
```

selected [from here](https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules), configured to:

- [`jsx-quotes`](http://eslint.org/docs/rules/jsx-quotes): enforce the consistent use of double quotes in JSX attributes
- [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md): enforce JSX closing brackets to be `line-aligned`
- [`react/jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md): enforce spaces inside of curly braces in JSX attributes
- [`react/jsx-equals-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md): disallow spaces around the equal sign in JSX attributes
- [`react/jsx-first-prop-new-line`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md): enforce first property to be placed on a new line when the properties are spread over multiple lines
- [`react/jsx-indent`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md): enforce tabs for indentation
- [`react/jsx-indent-props`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md): enforce tabs for indenting props
- [`react/jsx-max-props-per-line`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md): limit to a maximum of 2 props on a single line in JSX
- [`react/jsx-sort-props`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md): enforce alphabetical sorting of props, with shorthand props first and callbacks last
- [`react/jsx-space-before-closing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md): require spacing before closing bracket in JSX
- [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md): prevent extra closing tags for components without children
- [`react/sort-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md): enforce component methods to be in lifecycle order
- [`react/sort-prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md): enforce `propTypes` declarations to be alphabetically sorted, required props first and callbacks last

[gitter-img]: https://badges.gitter.im/kunalgolani/eslint-config.svg
[gitter-url]: https://gitter.im/kunalgolani/eslint-config?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[version-img]: https://img.shields.io/npm/v/eslint-config-react-native.svg
[npm-url]: https://www.npmjs.com/package/eslint-config-react-native
[downloads-img]: https://img.shields.io/npm/dt/eslint-config-react-native.svg
[issues-img]: https://img.shields.io/github/issues-raw/kunalgolani/eslint-config.svg?maxAge=2592000
[issues-url]: https://github.com/kunalgolani/eslint-config/issues
[deps-img]: https://img.shields.io/david/kunalgolani/eslint-config.svg
[devdeps-img]: https://img.shields.io/david/dev/kunalgolani/eslint-config.svg
[deps-url]: https://github.com/kunalgolani/eslint-config/blob/master/react-native/package.json
