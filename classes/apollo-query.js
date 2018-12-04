import { ApolloQueryMixin } from '../mixins/apollo-query-mixin';
import { ApolloElement } from './apollo-element.js';
export { html } from './apollo-element.js';

/** @typedef {"none" | "ignore" | "all"} ErrorPolicy */
/** @typedef {"cache-first" | "cache-and-network" | "network-only" | "cache-only" | "no-cache" | "standby"} FetchPolicy */

/**
 * # ApolloQuery
 *
 * 🚀 A custom element base class that connects to your Apollo cache.
 *
 * ## Usage
 *
 * ```html
 * <script type="module">
 *   import { cache } from './cache';
 *   import { link } from './link';
 *   import { ApolloClient } from 'apollo-client';
 *   import { ApolloQuery, html } from 'lit-apollo/apollo-query';
 *
 *   // Create the Apollo Client
 *   const client = new ApolloClient({ cache, link });
 *
 *   const errorTemplate = ({message = 'Unknown Error'}) => html`
 *     <h1>😢 Such Sad, Very Error! 😰</h1>
 *     <div>${message}</div>`
 *
 *   class ConnectedElement extends ApolloQuery {
 *     render() {
 *       const { data, error, loading, networkStatus } = this;
 *       return
 *           loading ? html`<such-overlay-very-spin></such-overlay-very-spin>`
 *         : error ? errorTemplate(error)
 *         : html`<p>${data.helloWorld.greeting}, ${data.helloWorld.name}</p>`
 *     }
 *
 *     constructor() {
 *       super();
 *       this.client = client;
 *       this.query = gql`query {
 *         helloWorld {
 *           name
 *           greeting
 *         }
 *       }`;
 *     }
 *   };
 *
 *   customElements.define('connected-element', ConnectedElement)
 * </script>
 * ```
 *
 * @extends LitElement
 * @appliesMixin ApolloQueryMixin
 */
export class ApolloQuery extends ApolloQueryMixin(ApolloElement) {
  static get properties() {
    return {
      /**
       * Enum of network statuses. See https://bit.ly/2sfKLY0
       * @type {Number}
       */
      networkStatus: { type: Object },
    };
  }

  /**
   * By default, will only render if
   *   - The component has `data` or
   *   - The component has an `error` or
   *   - The component is `loading`.
   * @param  {Map}  changedProps           Changed properties.
   * @return {Boolean}                     Whether the component should render.
   * @protected
   */
  shouldUpdate(changedProps) {
    return (
      this.loading != null ||
      !!this.error ||
      !!this.data
    );
  }
}