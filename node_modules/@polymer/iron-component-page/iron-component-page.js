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

import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-doc-viewer/default-theme.js';
import '@polymer/iron-doc-viewer/iron-doc-nav.js';
import '@polymer/iron-doc-viewer/iron-doc-viewer.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/color.js';
import '@polymer/paper-styles/typography.js';
import '@polymer/paper-toast/paper-toast.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="iron-doc-default-theme">
      :host {
        --app-drawer-width: 300px;
      }

      [hidden] {
        display: none;
      }

      app-header {
        @apply --paper-font-headline;
        color: white;
        background-color: var(--iron-component-page-header-color,
                              var(--iron-doc-accent-color, #5a5a5a));
      }

      [drawer-toggle] {
        flex-shrink: 0;
      }

      [condensed-title] {
        white-space: nowrap;
      }

      app-drawer {
        --app-drawer-content-container: {
          background-color: #fbfbfb;
        }
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      }

      iron-doc-nav {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
      }

      iron-doc-viewer {
        height: 100%;
        --iron-doc-title: {
          display: none;
        }
      }

      iron-doc-viewer:not([demo]) {
        padding: 5px 20px 20px 20px;
        max-width: 56em;
      }

      #error-toast {
        background-color: var(--paper-red-600);
      }
    </style>

    <iron-ajax auto url="[[descriptorUrl]]" handle-as="json" last-response="{{_descriptor}}" loading="{{_loading}}" last-error="{{_descriptorError}}">
    </iron-ajax>

    <paper-toast id="loading-toast" opened="[[_loading]]" duration="0">
      Loading descriptor ...
    </paper-toast>

    <paper-toast id="error-toast" opened="[[_descriptorError]]" duration="0">
      Could not load descriptor "[[descriptorUrl]]". <br> [[_descriptorError.error]]
    </paper-toast>

    <app-drawer-layout fullbleed narrow="{{_narrow}}">

      <app-drawer id="drawer" slot="drawer" swipe-open>
        <iron-doc-nav descriptor="[[_descriptor]]" base-href="[[baseHref]]" path="[[_path]]" on-select="_onNavSelect">
        </iron-doc-nav>
      </app-drawer>

      <app-header-layout has-scrolling-region>
        <app-header slot="header" fixed>
          <app-toolbar>
            <paper-icon-button icon="menu" drawer-toggle hidden\$="[[!_narrow]]">
            </paper-icon-button>

            <div>[[_title]]</div>
          </app-toolbar>
        </app-header>

        <iron-doc-viewer id="viewer" descriptor="[[_descriptor]]" root-namespace="[[rootNamespace]]" base-href="[[baseHref]]" demo-src-prefix="[[demoSrcPrefix]]" title="{{_title}}" path="{{_path}}" on-view-changed="_onViewChanged">
        </iron-doc-viewer>

      </app-header-layout>
    </app-drawer-layout>
`,

  is: 'iron-component-page',

  properties: {
    /**
     * URL of the Polymer Analyzer descriptor to fetch and display.
     */
    descriptorUrl: {
      type: String,
      value: 'analysis.json',
      observer: '_descriptorUrlChanged'
    },

    /**
     * By default all routing is performed using the URL fragment
     * (e.g. `docs.html#/elements/my-element`).
     *
     * If your server supports it and you would like to use the real URL
     * path instead (e.g. `/api/docs/elements/my-element`), set this to
     * the base path where the page is mounted, omitting the trailing
     * slash (e.g. `/api/docs` or *empty string* for the root path).
     */
    baseHref: String,

    /**
     * Instead of displaying items relative to the top level of
     * `descriptor`, start from this namespace.
     */
    rootNamespace: String,

    /**
     * URL prefix for demo iframes.
     */
    demoSrcPrefix: String,

    _loading: Boolean,

    _descriptorError: Object,

    _descriptor: {type: Object, observer: '_descriptorChanged'},

    _path: String,

    _narrow: Boolean,

    _title: {type: String, observer: '_titleChanged'}
  },

  _onViewChanged() {
    this.$.viewer.scrollIntoView();
  },

  _onNavSelect() {
    // Note we need to listen for this event, and can't rely just on the
    // path changing, because the user might click on the nav item they
    // are already viewing.
    this.$.viewer.scrollIntoView();
    if (this._narrow) {
      this.$.drawer.close();
    }
  },

  _descriptorUrlChanged() {
    this._descriptorError = null;
  },

  _descriptorChanged(descriptor) {
    if (!descriptor || this._changing) {
      return;
    }

    this._changing = true;
    this._descriptor = _flatten(descriptor);
    this._changing = false;
  },

  _titleChanged(title) {
    window.document.title = title;
  }
});

function _flatten(descriptor, flat) {
  if (!flat) {
    flat = {
      namespaces: [],
      elements: [],
      metadata: {polymer: {behaviors: []}},
      mixins: [],
      classes: [],
    };
  }
  for (var i = 0; i < (descriptor.namespaces || []).length; i++) {
    _flatten(descriptor.namespaces[i], flat);
    flat.namespaces.push(descriptor.namespaces[i]);
  }
  for (var i = 0; i < (descriptor.classes || []).length; i++) {
    flat.classes.push(descriptor.classes[i]);
  }
  for (var i = 0; i < (descriptor.elements || []).length; i++) {
    flat.elements.push(descriptor.elements[i]);
  }
  var descriptorBehaviors =
      ((descriptor.metadata || {}).polymer || {}).behaviors;
  for (var i = 0; i < (descriptorBehaviors || []).length; i++) {
    flat.metadata.polymer.behaviors.push(descriptorBehaviors[i]);
  }
  for (var i = 0; i < (descriptor.mixins || []).length; i++) {
    flat.mixins.push(descriptor.mixins[i]);
  }
  return flat;
}
