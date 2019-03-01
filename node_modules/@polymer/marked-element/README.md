[![Published on NPM](https://img.shields.io/npm/v/@polymer/marked-element.svg)](https://www.npmjs.com/package/@polymer/marked-element)
[![Build status](https://travis-ci.org/PolymerElements/marked-element.svg?branch=master)](https://travis-ci.org/PolymerElements/marked-element)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/marked-element)

## &lt;marked-element&gt;

Element wrapper for the [marked](https://github.com/chjj/marked) library.

`<marked-element>` accepts Markdown source, and renders it to a child
element with the slot `markdown-html`. This child element can be styled
as you would a normal DOM element. If you do not provide a child element
with the `markdown-html` slot, the Markdown source will still be rendered,
but to a shadow DOM child that cannot be styled.

See: [Documentation](https://www.webcomponents.org/element/@polymer/marked-element),
  [Demo](https://www.webcomponents.org/element/@polymer/marked-element/demo/demo/index.html).

## Usage

### Installation
```
npm install --save @polymer/marked-element
```

### In an html file
```html
<html>
  <head>
    <script type="module">
      import '@polymer/marked-element/marked-element.js';
    </script>
    <style>
      [slot="markdown-html"] p {
        color: red;
      }
    </style>
  </head>
  <body>
    <marked-element>
      <div slot="markdown-html"></div>
      <script type="text/markdown">
        Check out my markdown!

        We can even embed elements without fear of the HTML parser mucking up their
        textual representation:

        ```html
        <awesome-sauce>
          <div>Oops, I'm about to forget to close this div.
        </awesome-sauce>
        ```
      </script>
    </marked-element>
  </body>
</html>
```
### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/marked-element/marked-element.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        [slot="markdown-html"] p {
          color: red;
        }
      </style>
      <marked-element>
        <div slot="markdown-html"></div>
        <script type="text/markdown">
          Check out my markdown!

          We can even embed elements without fear of the HTML parser mucking up their
          textual representation:

          \`\`\`html
          <awesome-sauce>
            <div>Oops, I'm about to forget to close this div.
          </awesome-sauce>
          \`\`\`
        </script>
      </marked-element>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/PolymerElements/marked-element
cd marked-element
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