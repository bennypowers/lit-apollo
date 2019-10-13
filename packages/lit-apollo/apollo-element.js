export * from 'lit-element';
import { LitElement } from 'lit-element';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin.js';

/**
 * # ApolloElement
 *
 * Custom Element base class for apollo custom elements.
 *
 * @template TCacheShape
 * @template TData
 *
 * @element
 * @polymer
 * @extends LitElement
 * @appliesMixin ApolloElementMixin
 * @implements {import('@apollo-elements/mixins/apollo-element')<TCacheShape, TData>}
 */
export class ApolloElement extends ApolloElementMixin(LitElement) {
  static get properties() {
    return {
      /**
       * The Apollo client.
       * See https://github.com/apollo-elements/apollo-elements#-bundling
       */
      client: { type: Object },

      /**
       * The latest data for the query from the Apollo cache
       */
      data: { type: Object },

      /**
       * The latest error for the query from the Apollo cache
       */
      error: { type: Object },

      /**
       * If the query is currently in-flight.
       */
      loading: { type: Boolean },
    };
  }
}
