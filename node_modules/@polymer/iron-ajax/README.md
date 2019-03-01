[![Published on NPM](https://img.shields.io/npm/v/@polymer/iron-ajax.svg)](https://www.npmjs.com/package/@polymer/iron-ajax)
[![Build status](https://travis-ci.org/PolymerElements/iron-ajax.svg?branch=master)](https://travis-ci.org/PolymerElements/iron-ajax)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/iron-ajax)

## &lt;iron-ajax&gt;

The `iron-ajax` element declaratively exposes network request functionality to
Polymer's data-binding system.

See: [Documentation](https://www.webcomponents.org/element/@polymer/iron-ajax),
  [Demo](https://www.webcomponents.org/element/@polymer/iron-ajax/demo/demo/index.html).

## Usage

### Installation
```
npm install --save @polymer/iron-ajax
```

### In an html file
```html
<html>
  <head>
    <script type="module">
      import '@polymer/iron-ajax/iron-ajax.js';
    </script>
  </head>
  <body>
    <iron-ajax
        auto
        url="https://www.googleapis.com/youtube/v3/search"
        params='{"part":"snippet", "q":"polymer", "key": "YOUTUBE_API_KEY", "type": "video"}'
        handle-as="json"
        on-response="handleResponse"
        debounce-duration="300">
    </iron-ajax>
  </body>
</html>
```

### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/iron-ajax/iron-ajax.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <iron-ajax
          auto
          url="https://www.googleapis.com/youtube/v3/search"
          params='{"part":"snippet", "q":"polymer", "key": "YOUTUBE_API_KEY", "type": "video"}'
          handle-as="json"
          on-response="handleResponse"
          debounce-duration="300">
      </iron-ajax>
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
git clone https://github.com/PolymerElements/iron-ajax
cd iron-ajax
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