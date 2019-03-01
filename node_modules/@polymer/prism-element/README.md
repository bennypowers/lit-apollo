[![Published on NPM](https://img.shields.io/npm/v/@polymer/prism-element.svg)](https://www.npmjs.com/package/@polymer/prism-element)
[![Build status](https://travis-ci.org/PolymerElements/prism-element.svg?branch=master)](https://travis-ci.org/PolymerElements/prism-element)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/prism-element)

## &lt;prism-highlighter&gt;

Syntax highlighting via [Prism](http://prismjs.com/).

Place a `<prism-highlighter>` in your document, preferably as a direct child of
`<body>`. It will listen for `syntax-highlight` events on its parent element,
and annotate the code being provided via that event.

The `syntax-highlight` event's detail is expected to have a `code` property
containing the source to highlight. The event detail can optionally contain a
`lang` property, containing a string like `"html"`, `"js"`, etc.

This flow is supported by [`<marked-element>`](https://github.com/PolymerElements/marked-element).

See: [Documentation](https://www.webcomponents.org/element/@polymer/prism-element),
  [Demo](https://www.webcomponents.org/element/@polymer/prism-element/demo/demo/index.html).

## Usage

### Installation
```
npm install --save @polymer/prism-element
```

### In an html file
```html
<html>
  <body>
    <div id="parent">
      <prism-highlighter></prism-highlighter>
      <div id="output"></div>
    </div>
  </body>
  <script type="module">
      import '@polymer/prism-element/prism-highlighter.js';
      import '@polymer/prism-element/prism-theme-default.js';
      import '@polymer/polymer/lib/elements/custom-style.js';
      import {html} from '@polymer/polymer/lib/utils/html-tag.js';

      // import prism theme styles
      const template = html`
        <custom-style>
          <style include="prism-theme-default"></style>
        </custom-style>
      `;

      document.head.appendChild(template.contents);

      const parent = document.getElementById('parent');
      const output = document.getElementById('output');
      const ev = new CustomEvent('syntax-highlight');

      // enter code and language here
      ev.detail = {
        code: 'p { background-color: blue }',
        lang: 'css',
      };
      parent.dispatchEvent(ev);

      // detail is modified by prism-highlighter
      output.innerHTML = ev.detail.code;
    </script>
</html>
```
### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/prism-element/prism-element.js';
import '@polymer/prism-element/prism-highlighter.js';
import '@polymer/prism-element/prism-theme-default.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <style include="prism-theme-default"></style>
      <div id="parent">
        <prism-highlighter></prism-highlighter>
        <div id="output"></div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const ev = new CustomEvent('syntax-highlight');

    // enter code and language here
    ev.detail = {
      code: 'p { background-color: blue }',
      lang: 'css',
    };
    this.$.parent.dispatchEvent(ev);

    // detail is modified by prism-highlighter
    this.$.output.innerHTML = ev.detail.code;
  }
}
customElements.define('sample-element', SampleElement);
```

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/PolymerElements/prism-element
cd prism-element
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