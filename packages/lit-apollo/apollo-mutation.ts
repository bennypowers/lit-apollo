import type { DocumentNode } from 'graphql';
import type { MutationOptions, MutationUpdaterFn, FetchResult } from '@apollo/client/core';

import { ComplexAttributeConverter, LitElement, property } from 'lit-element';

import { splitCommasAndTrim } from '@apollo-elements/lib/helpers';
import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { ApolloMutationInterface, Constructor } from '@apollo-elements/interfaces';

const refetchQueriesConverter: ComplexAttributeConverter = {
  fromAttribute(value: string): string[] {
    return typeof value !== 'string' ? undefined : splitCommasAndTrim(value);
  },
};

/**
 * `ApolloMutation`
 *
 * 👩‍🚀 Custom element base class to issue mutations via your Apollo cache.
 */
export class ApolloMutation<TData, TVariables>
  extends ApolloMutationMixin(
    ApolloElement as Constructor<LitElement & ApolloElement>
  )<TData, TVariables>
  implements ApolloMutationInterface<TData, TVariables> {
  declare data: TData;

  declare variables: TVariables;

  declare mutation: DocumentNode;

  declare optimisticResponse?: TData | ((vars: TVariables) => TData)

  declare loading: boolean;

  declare ignoreResults: boolean;

  declare mostRecentMutationId: number;

  onCompleted?(_data: FetchResult<TData>): void

  onError?(_error: Error): void

  updater?(...params: Parameters<MutationUpdaterFn<TData>>):
    ReturnType<MutationUpdaterFn<TData>>;

  @property({ type: Boolean }) called = false;

  /**
   * As an attribute, can be a string of comma-separated query names
   * ```html
   * <mutation-element refetch-queries="QueryA, QueryB,QueryC"></mutation-element>
   * ```
   * As a property, you can pass any legal `refetchQueries` value.
   */
  @property({ attribute: 'refetch-queries', converter: refetchQueriesConverter })
  refetchQueries: MutationOptions['refetchQueries'] = null;
}
