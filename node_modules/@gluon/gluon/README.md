# Gluonjs

[![Build Status](https://api.travis-ci.org/ruphin/gluonjs.svg?branch=master)](https://travis-ci.org/ruphin/gluonjs)
[![NPM Latest version](https://img.shields.io/npm/v/@gluon/gluon.svg)](https://www.npmjs.com/package/@gluon/gluon)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

_A lightweight library for building web components and applications_

---

- **Platform Based:** GluonJS is designed to leverage the latest web platform capabilities, making it extremely small in size, and very performant on modern browsers. Additionally, it means that **build/compile steps are optional**; GluonJS components work on modern browsers without any pre-processing.
- **Component Model:** Build components with encapsulated logic and style, then compose them to make complex interfaces. Uses the Web Component standards, with all related APIs available directly to developers.
- **Highly Reusable:** Because GluonJS creates standards-compliant Web Components, you can use components created with GluonJS in almost any existing application. Check [Custom Elements Everywhere](https://custom-elements-everywhere.com/) for up-to-date compatibility tables with existing frameworks.
- **Powerful Templating:** GluonJS uses [lit-html](https://github.com/PolymerLabs/lit-html) for templating, making it highly expressive and flexible.

## Concepts

###

```javascript
import { GluonElement } from '/node_modules/@gluon/gluon/gluon.js';

class MyElement extends GluonElement {
  // ...
}

customElements.define(MyElement.is, MyElement);
```

### Rendering

Gluon uses [lit-html](https://github.com/PolymerLabs/lit-html) to efficiently render DOM into elements. The template to render is defined in the `template()` getter of an element, using JavaScript tagged template literals.

If a `template` is defined, Gluon will render the template during the initialization of the element (when `super.connectedCallback()` is called).

## API

### $

All nodes in the template with an `id` attribute are automatically mappped in the `$` property of an element. This provides an easy way to access named nodes without `querySelector` or `getElementById`.

The map is created during the initial render of the template. Use `this.shadowRoot.getElementById()` to access nodes that are added after the initial render.

### static get is()

Returns a kebab-cased version of the element ClassName, as an easy default tagname for the customElementRegistry. This allows easy Custom Element registration using `customElements.define(MyElement.is, MyElement)`.

\*\* NOTE: JavaScript minifiers like es-uglify may break this feature. Use the `{ keep_fnames: true, mangle: {keep_fnames: true} }` options in es-uglify to avoid breaking this feature. Alternatively, override the method to return a string to define a fixed tagname: `

‡ Pending IE support in [lit-html](https://github.com/PolymerLabs/lit-html)static get is() { return 'my-element' }`.

### get template()

### render()

Calling `render()` on an element will queue a render at the next [microtask timing](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/). Multiple calls are automatically batched into a single render.

Returns a promise object that is fulfilled after the render is complete.

To render synchronously, `render({sync: true})`

## Common Patterns

### Defining properties with getters and setters

This basic pattern works by defining a property getter and setter that wrap some other storage location for the property value.

```javascript
get someProp() {
  return this._someProp;
}

set someProp(value) {
  this._someProp = value;
}
```

Defining properties with getters and setters has no benefits in itself, but it makes for a more flexible system when adding more features such as property defaults, synchronising between properties and attributes, typed properties, or observing property changes, examples of which are listed below.

### Computed properties

Computed properties can be created by defining a property getter that computes the value for the property.

```javascript
get computedProp() {
  return this.someProp + this.otherProp;
}
```

\*\* NOTE: Computed properties are re-computed for every reference to the property. When the computation is expensive, it may be worthwhile to implement a cache:

```javascript
get computedProp() {
  if (this.__previousSomeProp == this.someProp && this.__previousOtherProp === this.otherProp) {
    return this.__cachedComputedProp;
  }

  this.__previousSomeProp = this.someProp;
  this.__previousOtherProp = this.otherProp;
  this.__cachedComputedProp = this.someProp + this.otherProp;
  return this.__cachedComputedProp;
}
```

### Typed properties

Define typed properties by adding type coercion in the property getter or setter.

```javascript
get numberProperty() {
  return this._numberProperty;
}

set numberProperty(value) {
  this._numberProperty = Number(value);
}
```

### Synchronising properties and attributes

### Observing attribute changes

Observing attribute changes is done using the Web Component attribute observer standards.

To observe changes on attributes, define a `static get observedAttributes()` on the class that returns an array of all attributes to observe:

```javascript
static get observedAttributes() {
  return ['some-attr', 'other-attr']
}
```

With this defined, `attributeChangedCallback(attr, oldValue, newValue)` will be called for all attributes listed in the array.

```javascript
attributeChangedCallback(attr, oldValue, newValue) {
  if (attr === 'some-attr') {
    // some-attr changed
  } else if (attr === 'other-attr') {
    // other-attr changed
  }
}
```

\*\* NOTE: attributeChangedCallback is also called for the initial attributes set on an element. It is in fact called before the `connectedCallback()`, which means the template has not yet been rendered. If you need to interact with child nodes, use the promise returned by `render()` to guarantee the template has been rendered and the child nodes exist:

```javascript
attributeChangedCallback(attr, oldValue, newValue) {
  if (attr === 'some-attr') {
    this.render().then( () => this.$.child.someFunction() );
  }
}
```

### Observing property changes

Observing property changes is done by calling the observer at the end of the property setter function.

```javascript
get someProp() {
  return this._someProp;
}

set someProp(value) {
  this._someProp = value;
  this.somePropChanged();
}
```

## Examples

Here is an example of a GluonJS component:

```javascript
// helloMessage.js
import { GluonElement, html } from '/node_modules/@gluon/gluon/gluon.js';

class HelloMessage extends GluonElement {
  get template() {
    return html`<div>Hello ${this.getAttribute('name')}</div>`;
  }
}

customElements.define(HelloMessage.is, HelloMessage);
```

We can import and use this component from anywhere:

```html
<!-- index.html -->
<script type="module" src="/helloMessage.js"></script>

<hello-message name="World"></hello-message>
```

This example will render "Hello World".

## Installation

GluonJS is available through [npm](https://www.npmjs.com) as `@gluon/gluon`.

## Compatibility

| Chrome | Safari | Firefox | Edge | IE   |
| ------ | ------ | ------- | ---- | ---- |
| ✔      | ✔      | \*      | \*   | \* † |

\* Requires [Web Component polyfill](https://www.webcomponents.org/polyfills/)

† Requires transpiling to ES5

## Contributing

All work on GluonJS happens in the open on [Github](https://github.com/ruphin/gluonjs). A development environment is available at `localhost:5000` with `npm install && npm run dev`, or `make dev` if you use [Docker](https://www.docker.com/). All issue reports and pull requests are welcome.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright © 2017-present, Goffert van Gool
