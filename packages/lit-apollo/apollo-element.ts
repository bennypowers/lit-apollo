import type { NormalizedCacheObject, ApolloClient, ApolloError } from '@apollo/client/core';
import type { GraphQLError } from 'graphql';

import { LitElement, property } from 'lit-element';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { ApolloElementInterface, Constructor } from '@apollo-elements/interfaces';

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for apollo custom elements.
 */
export class ApolloElement<TData = unknown, TVariables = unknown>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloElementMixin(LitElement as Constructor<LitElement>)<TData, TVariables>
  implements ApolloElementInterface<TData> {
  declare context?: Record<string, unknown>;

  @property({ attribute: false }) client: ApolloClient<NormalizedCacheObject> =
    window.__APOLLO_CLIENT__;

  @property({ attribute: false }) data: TData = null;

  @property({ attribute: false }) error: Error|ApolloError = null;

  @property({ attribute: false }) errors: readonly GraphQLError[] = null;

  @property({ type: Boolean, reflect: true }) loading = false;
}
