/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';

import './iron-doc-viewer-styles.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="iron-doc-viewer-styles">
      :host {
        padding: 16px;
      }

      a {
        background-color: #eee;
        display: block;
        padding: 15px;
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
        color: #1565c0;
      }

      a:hover {
        color: var(--iron-doc-accent-color-internal);
      }
    </style>

    <a href on-tap="_toggle">
      <span hidden\$="[[visible]]">Show</span>
      <span hidden\$="[[!visible]]">Hide</span>
      <span><slot></slot></span>
    </a>
`,

  is: 'iron-doc-hide-bar',
  properties: {visible: {type: Boolean, value: false, notify: true}},

  _toggle: function(ev) {
    ev.preventDefault();
    this.visible = !this.visible;
  }
});
