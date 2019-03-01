/**
 * @license
 * MIT License
 *
 * Copyright (c) 2018 Goffert van Gool
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { render } from '../../lit-html/lib/shady-render.js';
export { html } from '../../lit-html/lib/shady-render.js';

// Key to store the HTML tag in a custom element class
const TAG = Symbol('tag');

// Key to store render status in a custom element instance
const NEEDSRENDER = Symbol('needsRender');

// Transforms a camelCased string into a kebab-cased string
const camelToKebab = camel => camel.replace(/([a-z](?=[A-Z]))|([A-Z](?=[A-Z][a-z]))/g, '$1$2-').toLowerCase();

// Creates an ID cache in the `$` property of a custom element instance
const createIdCache = element => {
  element.$ = {};
  element.renderRoot.querySelectorAll('[id]').forEach(node => {
    element.$[node.id] = node;
  });
};

/**
 * A lightweight base class for custom elements
 *
 * Features:
 *
 *  - Determines an appropriate HTML tagname based on an element's class name
 *  - Efficient rendering engine using lit-html (https://github.com/Polymer/lit-html)
 *  - Creates a cache for descendant nodes with an `id` in the `$` property
 */
export class GluonElement extends HTMLElement {
  constructor() {
    super();
    this.renderRoot = this.createRenderRoot();

    // This ensures that any properties that are set prior to upgrading this element
    // have their instance setters called
    Object.getOwnPropertyNames(this).forEach(property => {
      const propertyValue = this[property];
      delete this[property];
      this[property] = propertyValue;
    });
  }

  /**
   * Returns an open shadowRoot as the default rendering root
   *
   * Override this method to provide an alternative rendering root
   * For example, return `this` to render the template as childNodes
   */
  createRenderRoot() {
    return this.attachShadow({ mode: 'open' });
  }

  /**
   * Returns the HTML tagname for elements of this class
   *
   * It defaults to the kebab-cased version of the class name. To override,
   * defined a `static get is()` property on your custom element class, and return
   * whatever string you want to use for the HTML tagname
   */
  static get is() {
    return (this.hasOwnProperty(TAG) && this[TAG]) || (this[TAG] = camelToKebab(this.name));
  }

  /**
   * Called when an element is connected to the DOM
   *
   * When an element has a `template`, attach a shadowRoot to the element,
   * and render the template. Once the template is rendered, creates an ID cache
   * in the `$` property
   *
   * When adding a `connectedCallback` to your custom element, you should call
   * `super.connectedCallback()` before doing anything other than actions
   * that alter the result of the template rendering.
   */
  connectedCallback() {
    if ('template' in this) {
      this.render({ sync: true });
      createIdCache(this);
    }
  }

  /**
   * Renders the template for this element into the shadowRoot
   *
   * @param { sync }: perform a synchronous (blocking) render. The default render
   *     is asynchronous, and multiple calls to `render()` are batched by default
   *
   * @returns a Promise that resolves once template has been rendered
   */
  async render({ sync = false } = {}) {
    this[NEEDSRENDER] = true;
    if (!sync) {
      await 0;
    }
    if (this[NEEDSRENDER]) {
      this[NEEDSRENDER] = false;
      render(this.template, this.renderRoot, { scopeName: this.constructor.is, eventContext: this });
    }
  }
}
