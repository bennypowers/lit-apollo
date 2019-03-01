[![Published on NPM](https://img.shields.io/npm/v/@polymer/iron-component-page.svg)](https://www.npmjs.com/package/@polymer/iron-component-page)
[![Build status](https://travis-ci.org/PolymerElements/iron-component-page.svg?branch=master)](https://travis-ci.org/PolymerElements/iron-component-page)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/iron-component-page)

## &lt;iron-component-page&gt;

`iron-component-page` is a full-page documentation browser for custom elements,
mixins, classes, and more. It consumes the JSON descriptor format produced by
[Polymer Analyzer](https://github.com/Polymer/polymer-analyzer).

See:
[Documentation](https://www.webcomponents.org/element/@polymer/iron-component-page),
[Demo](https://www.webcomponents.org/element/@polymer/iron-component-page/demo/demo/index.html).

You may also be interested in the
[`iron-doc-*`](https://github.com/PolymerElements/iron-doc-viewer) element
collection which underlies this element and can be used to embed documentation
in other apps (for example, [webcomponents.org](https://www.webcomponents.org)
does this).

## Usage

### Documenting your element

`iron-component-page` is designed to make it easy to view documentation for
your custom element project.

1. Install the [Polymer
   CLI](https://github.com/Polymer/tools/tree/master/packages/cli) with `npm
   install -g polymer-cli`. This gives you a command-line interface to Polymer
   Analyzer (among other things).

2. `cd` to your project directory. This can be a custom element, a full app, or
   even a plain JavaScript library. Polymer Analyzer will discover all of the
   interesting items recursively in your project directory.

3. Analyze your project with `polymer analyze > analysis.json`. This produces a
   JSON descriptor file. By default `iron-component-page` will look for a file
   called `analysis.json` (you can override this with the `descriptor-url`
   property).

4. Add `iron-component-page` as a dev dependency of your project: `npm
   install @polymer/iron-component-page --save-dev`.

5. Create an HTML file to instantiate an `iron-component-page` element (e.g.
   `index.html` or `docs.html`). Note that you may need to adjust your import
   paths depending on your project layout:

```html
<!doctype html>
<html>
  <head>
    <script type="module">
      import '@polymer/iron-component-page/iron-component-page.js';
    </script>
  </head>

  <body>
    <iron-component-page></iron-component-page>
  </body>
</html>
```

6. Serve that page using `polymer serve --npm`.

### Routing

`iron-component-page` handles URL routing (via `iron-doc-viewer`) to provide
permanent addresses for all locations in the documentation tree, including
scroll anchor targets.

By default it uses the URL fragment for routing (e.g.
`docs.html#/elements/my-element#property-foo`), in order to support simple
static file hosts.

To use the real URL path for routing, set the `base-href` property to the
server mount point (e.g. `/api/docs` or *empty string* for the root path). Note
that this requires a host that serves the application from all paths that
should be handled by the doc viewer.

### Styling

`iron-component-page` uses the default theme from
[`iron-doc-viewer`](https://github.com/PolymerElements/iron-doc-viewer). See
its documentation for styling. The following custom properties and mixins are
also available:

Custom property | Description | Default
----------------|-------------|----------
`--iron-component-page-header-color` | Background color of main header. | `paper-pink-600`

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/PolymerElements/iron-component-page
cd iron-component-page
npm install
npm install -g polymer-cli
```

### Running the demo locally
```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
