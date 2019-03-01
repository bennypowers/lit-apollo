/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/marked-element/marked-element.js';
import '@polymer/prism-element/prism-highlighter.js';
import '@polymer/prism-element/prism-theme-default.js';
import './iron-doc-api.js';
import './iron-doc-viewer-styles.js';

import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

import {IronDocViewerBehavior} from './iron-doc-viewer-behavior.js';

/*
`iron-doc-element` renders documentation about a custom element from a JSON
descriptor output by
[Polymer Analyzer](https://github.com/Polymer/polymer-analyzer).
*/
Polymer({
  _template: html`
    <style include="iron-doc-viewer-styles prism-theme-default">
      :host {
        @apply --iron-doc-docs;
      }
    </style>

    <prism-highlighter></prism-highlighter>

    <h1>[[title]]</h1>
    <p hidden\$="[[!descriptor.summary]]">[[descriptor.summary]]</p>

    <div>
      <code>
        class <span class="name">[[descriptor.name]]</span>
        extends
        <a class="name deeplink" target\$="[[_superclassTarget(descriptor.superclass)]]" href\$="[[_superclassUrl(descriptor.superclass)]]">[[descriptor.superclass]]</a>
        <span hidden\$="[[!descriptor.mixins]]"> with
          <span>
            <template is="dom-repeat" items="[[descriptor.mixins]]" sort="_compareDescriptors">
              <a class="name deeplink mixin" href\$="[[baseHref]]/mixins/[[item]]">[[item]]</a>
            </template>
          </span>
        </span>
      </code>
    </div>

    <div>Path: <code>[[descriptor.path]]</code></div>
    <div hidden\$="[[!descriptor.behaviors]]">Behaviors:
      <template is="dom-repeat" items="[[descriptor.behaviors]]" sort="_compareDescriptors">
        <a class="name deeplink" href\$="[[baseHref]]/behaviors/[[item]]">[[item]]</a>
      </template>
    </div>

    <section id="description" hidden\$="[[!descriptor.description]]" anchor-id\$="[[fragmentPrefix]]description">
      <h2>
        <a href\$="#[[fragmentPrefix]]description" class="deeplink">Description</a>
      </h2>

      <marked-element sanitize markdown="[[descriptor.description]]">
        <div slot="markdown-html" class="markdown-html"></div>
      </marked-element>
    </section>

    <iron-doc-api descriptor="[[descriptor]]" fragment-prefix="[[fragmentPrefix]]">
    </iron-doc-api>
`,

  is: 'iron-doc-element',
  behaviors: [IronDocViewerBehavior],
  properties: {title: {computed: '_computeTitle(descriptor)', notify: true}},

  _superclassUrl: function(superclass) {
    if (superclass === 'HTMLElement') {
      return 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement';
    }
    return this.baseHref + '/mixins/' + superclass;
  },

  _superclassTarget: function(superclass) {
    if (superclass === 'HTMLElement') {
      return '_blank';
    }
    return '';
  },

  _computeTitle: function(descriptor) {
    return descriptor && 'Element ' + this._getElementName(descriptor);
  }
});
