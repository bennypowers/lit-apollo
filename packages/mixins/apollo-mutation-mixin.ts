import type {
  ApolloError,
  DocumentNode,
  FetchPolicy,
  FetchResult,
  MutationOptions,
  MutationUpdaterFn,
  OperationVariables,
} from '@apollo/client/core';

import { gqlDocument, writable } from '@apollo-elements/lib/descriptors';

import type {
  ApolloMutationInterface,
  ComponentDocument,
  Constructor,
  Data,
  OptimisticResponseType,
  RefetchQueriesType,
  Variables,
} from '@apollo-elements/interfaces';

import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { ApolloElementMixin } from './apollo-element-mixin';

type ApolloMutationResultEvent<TData = unknown> =
  CustomEvent<FetchResult<TData>>;

declare global {
  interface HTMLElementEventMap {
    'apollo-mutation-result': ApolloMutationResultEvent;
  }
}

type MixinInstance = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new <D, V = Record<string, any>>(): ApolloMutationInterface<D, V>;
  documentType: 'mutation';
  observedAttributes?: string[];
}

function ApolloMutationMixinImpl<B extends Constructor>(base: B): B & MixinInstance {
  class ApolloMutationElement<D, V = OperationVariables>
    extends ApolloElementMixin(base)
    implements ApolloMutationInterface<D, V> {
    static documentType = 'mutation' as const;

    static get observedAttributes(): string[] {
      return [
        ...(super.observedAttributes ?? []), /* c8 ignore next */
        'await-refetch-queries',
        'refetch-queries',
      ];
    }

    /**
     * Latest mutation data.
     */
    declare data: Data<D> | null;

    /**
     * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
     *
     * @summary Mutation variables.
     */
    declare variables: Variables<D, V> | null;

    declare mutation: DocumentNode | ComponentDocument<D> | null;

    declare refetchQueries: RefetchQueriesType<D> | null;

    declare called: boolean;

    declare context?: Record<string, unknown>;

    declare optimisticResponse?: OptimisticResponseType<D, V>;

    declare fetchPolicy?: Extract<FetchPolicy, 'no-cache'>;

    declare awaitRefetchQueries?: boolean;

    onCompleted?(_data: Data<D>): void;

    onError?(_error: Error): void;

    updater?(
      ...params: Parameters<MutationUpdaterFn<Data<D>>>
    ): ReturnType<MutationUpdaterFn<Data<D>>>;

    ignoreResults = false;

    /**
     * The ID number of the most recent mutation since the element was instantiated.
     */
    private mostRecentMutationId = 0;

    constructor(...a: any[]) {
      super(...a);
      this.variables ??= null;
      this.loading ??= false;
    }

    attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
      super.attributeChangedCallback?.(name, oldVal, newVal);
      /* c8 ignore start */
      // @ts-expect-error: ts is not tracking the static side
      if ((super.constructor?.observedAttributes ?? []).includes(name))
        return;
      /* c8 ignore stop */

      switch (name) { /* c8 ignore next */
        case 'await-refetch-queries':
          this.awaitRefetchQueries =
            this.hasAttribute('await-refetch-queries');
          break; /* c8 ignore next */

        case 'refetch-queries':
          this.refetchQueries =
            !newVal ? null : newVal
              .split(',')
              .map(x => x.trim());
          break; /* c8 ignore next */
      }
    }

    connectedCallback() {
      super.connectedCallback?.();
    }

    /**
     * This resolves a single mutation according to the options specified and returns a Promise which is either resolved with the resulting data or rejected with an error.
     */
    public async mutate(
      params?: Partial<MutationOptions<Data<D>, Variables<D, V>>>
    ): Promise<FetchResult<Data<D>>> {
      if (!this.client)
        throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/'); /* c8 ignore next */ // covered
      const options: MutationOptions<Data<D>, Variables<D, V>> = {
        // all covered
        /* c8 ignore start */
        // It's better to let Apollo client throw this error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        mutation: params?.mutation ?? this.mutation!,

        awaitRefetchQueries: params?.awaitRefetchQueries ?? this.awaitRefetchQueries,
        context: params?.context ?? this.context,
        errorPolicy: params?.errorPolicy ?? this.errorPolicy,
        fetchPolicy: params?.fetchPolicy ?? this.fetchPolicy,
        optimisticResponse: params?.optimisticResponse ?? this.optimisticResponse,
        refetchQueries: params?.refetchQueries ?? this.refetchQueries ?? undefined,
        update: params?.update ?? this.updater,
        variables: params?.variables ?? this.variables ?? undefined,
        /* c8 ignore stop */
      };

      const mutationId = this.generateMutationId();

      this.loading = true;
      this.error = null;
      this.data = null;
      this.called = true;

      return this.client.mutate<Data<D>, Variables<D, V>>(options)
        .then(this.onCompletedMutation.bind(this, mutationId))
        .catch(this.onMutationError.bind(this, mutationId));
    }

    /**
     * Increments and returns the most recent mutation id.
     */
    private generateMutationId(): number {
      this.mostRecentMutationId += 1;
      return this.mostRecentMutationId;
    }

    /**
     * Returns true when an ID matches the most recent mutation id.
     */
    private isMostRecentMutation(mutationId: number): boolean {
      return this.mostRecentMutationId === mutationId;
    }

    /**
     * Callback for when a mutation is completed.
     */
    private onCompletedMutation(
      mutationId: number,
      response: FetchResult<Data<D>>
    ): FetchResult<Data<D>> {
      const { data } = response;
      this.dispatchEvent(new CustomEvent('apollo-mutation-result', { detail: response }));
      if (this.isMostRecentMutation(mutationId) && !this.ignoreResults) {
        this.loading = false;
        this.error = null;
        this.data = data ?? null; /* c8 ignore next */
        this.errors = response.errors ?? null;
        if (data)
          this.onCompleted?.(data);
      }
      return response;
    }

    /**
     * Callback for when a mutation fails.
     */
    private onMutationError(mutationId: number, error: ApolloError): never {
      this.dispatchEvent(new CustomEvent('apollo-error', { detail: error }));
      if (this.isMostRecentMutation(mutationId)) {
        this.loading = false;
        this.data = null;
        this.error = error;
      }
      this.onError?.(error);
      throw error;
    }
  }

  Object.defineProperties(ApolloMutationElement.prototype, {
    called: writable(false),
    mutation: gqlDocument(),
    optimisticResponse: writable(),
    refetchQueries: writable(null),
  });

  return ApolloMutationElement;
}

/**
 * `ApolloMutationMixin`: class mixin for apollo-mutation elements.
 */
export const ApolloMutationMixin =
  dedupeMixin(ApolloMutationMixinImpl);
