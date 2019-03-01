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
import './iron-doc-function.js';
import './iron-doc-summary.js';
import './iron-doc-viewer-styles.js';

import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

import {IronDocViewerBehavior} from './iron-doc-viewer-behavior.js';

/*
`iron-doc-namespace` renders documentation about a JavaScript namespace from a
JSON descriptor output by
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

    <section id="description" anchor-id\$="[[fragmentPrefix]]description" hidden\$="[[!descriptor.description]]">
      <h2>
        <a href\$="#[[fragmentPrefix]]description" class="deeplink">Description</a>
      </h2>
      <marked-element sanitize markdown="[[descriptor.description]]">
        <div slot="markdown-html" class="markdown-html"></div>
      </marked-element>
    </section>

    <section anchor-id\$="[[fragmentPrefix]]elements" hidden\$="[[_noneToShow(_showProtected,_showInherited,descriptor,'elements')]]">
      <h2>
        <a href\$="#[[fragmentPrefix]]elements" class="deeplink">Elements</a>
      </h2>
      <template is="dom-repeat" items="[[descriptor.elements]]" sort="_compareDescriptors">
        <iron-doc-summary name="[[_getElementName(item)]]" description="[[item.summary]]" href="[[baseHref]]/elements/[[_getElementId(item)]]">
        </iron-doc-summary>
      </template>
    </section>

    <section anchor-id\$="[[fragmentPrefix]]classes" hidden\$="[[_noneToShow(_showProtected,_showInherited,descriptor,'classes')]]">
      <h2>
        <a href\$="#[[fragmentPrefix]]classes" class="deeplink">Classes</a>
      </h2>
      <template is="dom-repeat" items="[[descriptor.classes]]" sort="_compareDescriptors">
        <iron-doc-summary name="[[item.name]]" description="[[item.summary]]" href="[[baseHref]]/classes/[[_getElementId(item)]]">
        </iron-doc-summary>
      </template>
    </section>

    <section anchor-id\$="[[fragmentPrefix]]mixins" hidden\$="[[_noneToShow(_showProtected,_showInherited,descriptor,'mixins')]]">
      <h2>
        <a href\$="#[[fragmentPrefix]]mixins" class="deeplink">Mixins</a>
      </h2>
      <template is="dom-repeat" items="[[descriptor.mixins]]" sort="_compareDescriptors">
        <iron-doc-summary name="[[item.name]]" description="[[item.summary]]" href="[[baseHref]]/mixins/[[item.name]]">
        </iron-doc-summary>
      </template>
    </section>

    <section anchor-id\$="[[fragmentPrefix]]behaviors" hidden\$="[[_noneToShow(_showProtected,_showInherited,descriptor,'behaviors')]]">
      <h2>
        <a href\$="#[[fragmentPrefix]]behaviors" class="deeplink">Behaviors</a>
      </h2>
      <template is="dom-repeat" items="[[_getPolymerBehaviors(descriptor)]]" sort="_compareDescriptors">
        <iron-doc-summary name="[[item.name]]" description="[[item.summary]]" href="[[baseHref]]/behaviors/[[item.name]]">
        </iron-doc-summary>
      </template>
    </section>

    <section anchor-id\$="[[fragmentPrefix]]functions" hidden\$="[[_noneToShow(_showProtected,_showInherited,descriptor,'functions')]]">
      <h2>
        <a href\$="#[[fragmentPrefix]]functions" class="deeplink">Functions</a>
      </h2>
      <template is="dom-repeat" items="[[descriptor.functions]]" sort="_compareDescriptors">
        <iron-doc-function add-import-path anchor-id="[[fragmentPrefix]]function-[[item.name]]" descriptor="[[item]]">
        </iron-doc-function>
      </template>
    </section>

    <section anchor-id\$="[[fragmentPrefix]]namespaces" hidden\$="[[_noneToShow(_showProtected,_showInherited,descriptor,'namespaces')]]">
      <h2>
        <a href\$="#[[fragmentPrefix]]namespaces" class="deeplink">Namespaces</a>
      </h2>
      <div hidden\$="[[!descriptor.namespaces.length]]">
        <template is="dom-repeat" items="[[descriptor.namespaces]]" sort="_compareDescriptors">
          <iron-doc-summary name="[[item.name]]" description="[[item.summary]]" href="[[baseHref]]/namespaces/[[item.name]]">
          </iron-doc-summary>
        </template>
      </div>
    </section>
`,

  is: 'iron-doc-namespace',
  behaviors: [IronDocViewerBehavior],
  properties: {title: {computed: '_computeTitle(descriptor)', notify: true}},

  _computeTitle: function(descriptor) {
    return descriptor && 'Namespace ' + (descriptor.name || 'global');
  }
});
