## Pluggable [ESLint](http://eslint.org/docs/about/) [config](http://eslint.org/docs/developer-guide/shareable-configs) for [React Native](https://facebook.github.io/react-native) that you can import, extend and override

[![Join the chat at https://gitter.im/kunalgolani/eslint-config ][gitter-img]][gitter-url]
[![npm version][version-img]][npm-url]
[![npm downloads][downloads-img]][npm-url]
[![GitHub issues][issues-img]][issues-url]
[![Deps][deps-img]][deps-url]
[![Dev Deps][devdeps-img]][deps-url]

### React Native: Safety Checks and Best Practices with a bias toward code concision / brevity

#### Usage

In your js project directory:

```shell
npm install --save-dev eslint-config-react-native
```

And in your `.eslintrc.yaml`:

```yaml
extends:
  - react-native
```

Alternatively, in your `.eslintrc.js` or `.eslintrc.json`:

```json
{
  "extends": ["react-native"]
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
  browser: true
```

[enables](http://eslint.org/docs/user-guide/configuring#specifying-environments) browser features and global variables

```yaml
plugins:
  - react
  - react-native
```

provides [React](https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules), [JSX](https://github.com/yannickcr/eslint-plugin-react#jsx-specific-rules) and [React Native](https://github.com/intellicode/eslint-plugin-react-native#list-of-supported-rules) specific rules

```yaml
extends:
  - esnext
  - plugin:react/recommended
```

[enables](http://eslint.org/docs/user-guide/configuring#specifying-environments) `jsx` parsing, includes config and rules from [eslint-config-esnext](https://github.com/kunalgolani/eslint-config/tree/master/packages/esnext) and the following [react-specific recommended rules](https://github.com/yannickcr/eslint-plugin-react#recommended-configuration.md):

- [`react/display-name`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md): prevent missing `displayName` in a React component definition
- [`react/jsx-no-duplicate-props`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md): prevent duplicate properties in JSX components
- [`react/jsx-no-undef`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md): disallow undeclared variables as JSX components
- [`react/jsx-uses-react`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md): prevent React from being marked as unused in a file using JSX
- [`react/jsx-uses-vars`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md): prevent variables used in JSX to be incorrectly marked as unused
- [`react/no-deprecated`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md): prevent usage of deprecated methods
- [`react/no-direct-mutation-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md): prevent direct mutation of `this.state`
- [`react/no-is-mounted`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md): prevent usage of `isMounted`
- [`react/no-unknown-property`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md): prevent usage of unknown DOM property
- [`react/prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md): prevent missing props validation in a React component definition
- [`react/react-in-jsx-scope`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md): prevent missing `React` when using JSX
- [`react/require-render-return`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md): prevent missing `return` in `render()`

```yaml
rules:
```

selected [from here](https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules), configured to:

- [`react-native/no-color-literals`](https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/no-color-literals.md): detect `StyleSheet` rules and inline styles containing color literals instead of variables
- [`react-native/no-inline-styles`](https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/no-inline-styles.md): detect JSX components with inline styles that contain literal values
- [`react-native/no-unused-styles`](https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/no-unused-styles.md): detect unused `StyleSheet` rules
- [`react-native/split-platform-components`](https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/split-platform-components.md): enforce using platform specific filenames when necessary
- [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md): prefer shorthand if an attribute has a `true` value in JSX
- [`react/jsx-handler-names`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md): enforce event handler naming conventions in JSX
- [`react/jsx-key`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md): validate JSX has `key` prop when in array or iterator; set to warn only
- [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md): prevent usage of `.bind()` and arrow functions in JSX props; set to warn only
- [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md): enforce PascalCase for user-defined JSX components
- [`react/jsx-wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md): prevent missing parentheses around multiline JSX
- [`react/no-danger`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md): prevent usage of `dangerouslySetInnerHTML`
- [`react/no-did-mount-set-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md): prevent usage of `setState` in `componentDidMount`, but allow inside callbacks
- [`react/no-did-update-set-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md): prevent usage of `setState` in `componentDidUpdate`, but allow inside callbacks
- [`react/no-find-dom-node`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md): Prevent usage of `findDOMNode`
- [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md): prevent multiple component definitions per file, apart from stateless functional components
- [`react/no-render-return-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md): prevent usage of the return value of `ReactDOM.render()`
- [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md): prevent using string references in `ref` attribute
- [`react/no-unused-prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md): prevent definitions of unused prop types
- [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md): enforce ES5 or ES6 class for React Components
- [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md): enforce stateless React Components to be written as a pure function

---

### [React Native Style Guide](https://github.com/kunalgolani/eslint-config/tree/master/packages/react-native/style-guide)

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
