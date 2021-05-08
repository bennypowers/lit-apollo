import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  DocumentNode,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type {
  ComponentDocument,
  Data,
  MaybeTDN,
  MaybeVariables,
  Variables,
} from '@apollo-elements/interfaces';

export type ApolloControllerHost = HTMLElement & ReactiveControllerHost;

export interface ApolloControllerOptions<D, V> {
  client?: ApolloClient<NormalizedCacheObject>;
  variables?: Variables<D, V>;
  /** Host update callback */
  [update]?(properties?: Record<string, unknown>): void;
}

export const update = Symbol('update');

export class ApolloControllerEvent extends Event {
  static declare type: `apollo-controller-${'disconnected'|'connected'}`;

  constructor(public controller: ApolloController) {
    super(ApolloControllerConnectedEvent.type, { bubbles: true, composed: true });
  }
}

export class ApolloControllerConnectedEvent extends ApolloControllerEvent {
  static type = 'apollo-controller-connected' as const;
}

export class ApolloControllerDisconnectedEvent extends ApolloControllerEvent {
  static type = 'apollo-controller-disconnected' as const;
}

export abstract class ApolloController<D extends MaybeTDN = any, V = MaybeVariables<D>>
implements ReactiveController {
  declare options: ApolloControllerOptions<D, V>;

  called = true;

  client?: ApolloClient<NormalizedCacheObject>;

  data: Data<D> | null = null;

  error: ApolloError | null = null;

  errors: ApolloQueryResult<D>['errors'] = [];

  loading = false;

  #document?: ComponentDocument<D>;

  #variables?: Variables<D, V>;

  get document(): ComponentDocument<D> | undefined { return this.#document; }

  set document(document: ComponentDocument<D> | undefined) {
    this.#document = document;
    this.options[update]?.({ document });
    this.documentChanged?.(document);/* c8 ignore next */
  }

  get variables(): Variables<D, V> | undefined { return this.#variables; }

  set variables(variables: Variables<D, V> | undefined) {
    this.#variables = variables;
    this.options[update]?.({ variables });
    this.variablesChanged?.(variables);/* c8 ignore next */
  }

  protected abstract documentChanged?(document?: DocumentNode | ComponentDocument<D>): void

  protected abstract variablesChanged?(variables?: Variables<D, V>): void

  constructor(public host: ReactiveControllerHost, options?: ApolloControllerOptions<D, V>) {
    this.options = options ?? {};
    this.client = this.options.client ?? window.__APOLLO_CLIENT__;
    host.addController?.(this);
  }

  init(document?: ComponentDocument<D>): void {
    this.document = document;
    this.variables = this.options?.variables;
  }

  hostConnected(): void {
    const event = new ApolloControllerConnectedEvent(this);
    (this.host as unknown as EventTarget).dispatchEvent?.(event); /* c8 ignore next */
  }

  [update](properties?: Record<string, unknown>): void {
    this.host.requestUpdate();
    this.options[update]?.(properties);
  }

  hostDisconnected(): void {
    const event = new ApolloControllerDisconnectedEvent(this);
    dispatchEvent(event);
  }
}