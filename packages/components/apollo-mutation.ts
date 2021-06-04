import type * as I from '@apollo-elements/interfaces';

import type { PropertyValues } from 'lit';

import type { MutationUpdaterFn } from '@apollo/client/core';

import { GraphQLScriptChildMixin } from '@apollo-elements/mixins/graphql-script-child-mixin';

import { ApolloElement } from './apollo-element';

import { ApolloMutationController } from '@apollo-elements/core/apollo-mutation-controller';

import { controlled } from '@apollo-elements/core/decorators';

import { customElement, state, property } from '@lit/reactive-element/decorators.js';

import { isEmpty } from '@apollo-elements/lib/helpers';

import { bound } from '@apollo-elements/lib/bound';

import * as E from './events';

declare global { interface HTMLElementTagNameMap { 'apollo-mutation': ApolloMutationElement } }

type P<D extends I.MaybeTDN, V, K extends keyof ApolloMutationController<D, V>> =
  ApolloMutationController<D, V>[K] extends (...args:any[]) => unknown
  ? Parameters<ApolloMutationController<D, V>[K]>
  : never

type R<D extends I.MaybeTDN, V, K extends keyof ApolloMutationController<D, V>> =
  ApolloMutationController<D, V>[K] extends (...args:any[]) => unknown
  ? ReturnType<ApolloMutationController<D, V>[K]>
  : never

/** @noInheritDoc */
interface ButtonLikeElement extends HTMLElement {
  disabled: boolean;
}

/** @noInheritDoc */
interface InputLikeElement extends HTMLElement {
  value: string;
  disabled: boolean;
}

/** @ignore */
export class WillMutateError extends Error {}

/**
 * Simple Mutation component that takes a button or link-wrapped button as it's trigger.
 * When loading, it disables the button.
 * On error, it toasts a snackbar with the error message.
 * You can pass a `variables` object property,
 * or if all your variables properties are strings,
 * you can use the element's data attributes
 *
 * @fires will-mutate When the element is about to mutate. Useful for setting variables. Prevent default to prevent mutation. Detail is `{ element: this }`
 * @fires will-navigate When the mutation resolves and the element is about to navigate. cancel the event to handle navigation yourself e.g. using a client-side router. . `detail` is `{ data: Data, element: this }`
 * @fires mutation-completed When the mutation resolves. `detail` is `{ data: Data, element: this }`
 * @fires mutation-error When the mutation is rejected. `detail` is `{ error: ApolloError, element: this }`
 * @fires 'apollo-element-disconnected' when the element disconnects from the dom
 * @fires 'apollo-element-connected' when the element connects to the dom
 *
 * @slot - Mutations typically trigger when clicking a button. Slot in an element with a `trigger` attribute to assign it as the element's trigger. The triggering element. Must be a button or and anchor that wraps a button.\n\nYou may also slot in input elements with the `data-variable=\"variableName\"` attribute. It's `value` property gets the value for the corresponding variable.
 *
 * See [`ApolloMutationInterface`](https://apolloelements.dev/api/interfaces/mutation) for more information on events
 *
 * @example
 * Using data attributes
 * ```html
 * <apollo-mutation data-type="Type" data-action="ACTION">
 *   <mwc-button trigger>OK</mwc-button>
 * </apollo-mutation>
 * ```
 * Will mutate with the following as `variables`:
 * ```json
 * {
 *   "type": "Type",
 *   "action": "ACTION"
 * }
 * ```
 *
 * @example
 * Using data attributes and variables
 * ```html
 * <apollo-mutation data-type="Quote" data-action="FLUB">
 *   <mwc-button trigger label="OK"></mwc-button>
 *   <mwc-textfield
 *       data-variable="name"
 *       value="Neil"
 *       label="Name"></mwc-textfield>
 *   <mwc-textarea
 *       data-variable="comment"
 *       value="That's one small step..."
 *       label="comment"></mwc-textarea>
 * </apollo-mutation>
 * ```
 * Will mutate with the following as `variables`:
 * ```json
 * {
 *   "name": "Neil",
 *   "comment": "That's one small step...",
 *   "type": "Quote",
 *   "action": "FLUB"
 * }
 * ```
 *
 * @example
 * Using data attributes and variables with input property
 * ```html
 * <apollo-mutation data-type="Type" data-action="ACTION" input-key="actionInput">
 *   <mwc-button trigger label="OK"></mwc-button>
 *   <mwc-textfield
 *       data-variable="comment"
 *       value="Hey!"
 *       label="comment"></mwc-textfield>
 * </apollo-mutation>
 * ```
 * Will mutate with the following as `variables`:
 * ```json
 * {
 *   "actionInput": {
 *     "comment": "Hey!",
 *     "type": "Type",
 *     "action": "ACTION"
 *   }
 * }
 * ```
 *
 * @example
 * Using DOM properties
 * ```html
 * <apollo-mutation id="mutation">
 *   <mwc-button trigger label="OK"></mwc-button>
 * </apollo-mutation>
 * <script>
 *   document.getElementById('mutation').mutation = SomeMutation;
 *   document.getElementById('mutation').variables = {
 *     type: "Type",
 *     action: "ACTION"
 *   };
 * </script>
 * ```
 *
 * Will mutate with the following as `variables`:
 *
 * ```json
 * {
 *   "type": "Type",
 *   "action": "ACTION"
 * }
 * ```
 */
@customElement('apollo-mutation')
export class ApolloMutationElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends GraphQLScriptChildMixin(ApolloElement)<D, V>
  implements I.ApolloMutationInterface<D, V> {
  static readonly is = 'apollo-mutation';

  /**
   * False when the element is a link.
   */
  private static isButton(node: Element|null): node is ButtonLikeElement {
    return !!node && node.tagName !== 'A';
  }

  private static isLink(node: Element|null): node is HTMLAnchorElement {
    return node instanceof HTMLAnchorElement;
  }

  private static toVariables<T>(acc: T, element: InputLikeElement): T {
    // querySelectorAll ensures the data-variable attr exists
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { ...acc, [element.dataset.variable!]: element.value };
  }

  private static isTriggerNode(node: Node): node is HTMLElement {
    return node instanceof HTMLElement && node.hasAttribute('trigger');
  }

  private static debounce(f: () => void, timeout: number): () => void {
    let timer: number;
    return () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => { f(); }, timeout);
    };
  }

  private inFlightTrigger: HTMLElement | null = null;

  private doMutate = (): void => void (this.controller.mutate().catch(() => void 0));

  private debouncedMutate = this.doMutate;

  #buttonMO?: MutationObserver;

  #listeners = new WeakMap<HTMLElement, string>();

  /**
   * Slotted trigger nodes
   */
  protected get triggers(): NodeListOf<HTMLElement> {
    return this.querySelectorAll('[trigger]');
  }

  /**
   * If the slotted trigger node is a button, the trigger
   * If the slotted trigger node is a link with a button as it's first child, the button
   */
  protected get buttons(): ButtonLikeElement[] {
    const { isButton, isLink } = ApolloMutationElement;
    return Array.from(this.triggers, x => {
      if (isLink(x) && isButton(x.firstElementChild))
        /* c8 ignore next 3 */
        return x.firstElementChild;
      else
        return x;
    }).filter(isButton);
  }

  /**
   * Variable input nodes
   */
  protected get inputs(): InputLikeElement[] {
    return Array.from(this.querySelectorAll<InputLikeElement>('[data-variable]'));
  }

  controller: ApolloMutationController<D, V> = new ApolloMutationController<D, V>(this, null, {
    onCompleted: data => {
      const trigger = this.inFlightTrigger;
      this.didMutate();
      this.dispatchEvent(new E.MutationCompletedEvent<D, V>(this));
      if (ApolloMutationElement.isLink(trigger) || trigger?.closest?.('a[trigger]'))
        this.willNavigate(data, trigger);
    },

    onError: () => {
      this.didMutate();
      this.dispatchEvent(new E.MutationErrorEvent<D, V>(this));
    },
  });

  /**
   * When set, variable data attributes will be packed into an
   * object property with the name of this property
   * @example
   * ```html
   * <apollo-mutation id="a" data-variable="var"></apollo-mutation>
   * <apollo-mutation id="b" input-key="input" data-variable="var"></apollo-mutation>
   * <script>
   *   console.log(a.variables) // { variable: 'var' }
   *   console.log(b.variables) // { input: { variable: 'var' } }
   * </script>
   * ```
   * @summary key to wrap variables in e.g. `input`.
   */
  @property({ attribute: 'input-key', reflect: true }) inputKey: string|null = null;

  /**
   * @summary Optional number of milliseconds to wait between calls
   */
  @property({ type: Number, reflect: true }) debounce: number | null = null;

  /**
   * @summary Whether the mutation was called
   */
  @controlled() @property({ type: Boolean, reflect: true }) called = false;

  /** @summary The mutation. */
  @controlled() @state() mutation: null | I.ComponentDocument<D> = null;

  /** @summary Context passed to the link execution chain. */
  @controlled({ path: 'options' }) @state() context?: Record<string, unknown>;

  /**
   * An object that represents the result of this mutation that
   * will be optimistically stored before the server has actually returned a
   * result.
   *
   * This is most often used for optimistic UI, where we want to be able to see
   * the result of a mutation immediately, and update the UI later if any errors
   * appear.
   */
  @controlled({ path: 'options' }) @state() optimisticResponse?: I.OptimisticResponseType<D, V>;


  /**
   * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
   *
   * @summary Mutation variables.
   */
  @controlled() @state() variables: I.Variables<D, V> | null = null;

  /**
   * @summary If true, the returned data property will not update with the mutation result.
   */
  @controlled({ path: 'options' })
  @property({ attribute: 'ignore-results', type: Boolean })
  ignoreResults = false;

  /**
   * Queries refetched as part of refetchQueries are handled asynchronously,
   * and are not waited on before the mutation is completed (resolved).
   * Setting this to true will make sure refetched queries are completed
   * before the mutation is considered done. false by default.
   * @attr await-refetch-queries
   */
  @controlled({ path: 'options' })
  @property({ attribute: 'await-refetch-queries', type: Boolean })
  awaitRefetchQueries = false;

  /**
   * Specifies the ErrorPolicy to be used for this mutation.
   * @attr error-policy
   */
  @controlled({ path: 'options' })
  @property({ attribute: 'error-policy' })
  errorPolicy?: this['controller']['options']['errorPolicy'];

  /**
   * Specifies the FetchPolicy to be used for this mutation.
   * @attr fetch-policy
   */
  @controlled({ path: 'options' })
  @property({ attribute: 'fetch-policy' })
  fetchPolicy?: this['controller']['options']['fetchPolicy'];

  /**
   * A list of query names which will be refetched once this mutation has returned.
   * This is often used if you have a set of queries which may be affected by a mutation and will have to update.
   * Rather than writing a mutation query reducer (i.e. `updateQueries`) for this,
   * you can refetch the queries that will be affected
   * and achieve a consistent store once these queries return.
   * @attr refetch-queries
   */
  @controlled({ path: 'options' })
  @property({
    attribute: 'refetch-queries',
    converter: {
      fromAttribute(newVal) {
        return !newVal ? null : newVal
          .split(',')
          .map(x => x.trim());
      },
    },
  }) refetchQueries: I.RefetchQueriesType<D> | null = null;

  /**
   * Define this function to determine the URL to navigate to after a mutation.
   * Function can be synchronous or async.
   * If this function is not defined, will navigate to the `href` property of the link trigger.
   * @example Navigate to a post's page after creating it
   * ```html
   * <apollo-mutation id="mutation">
   *   <script type="application/graphql">
   *     mutation CreatePostMutation($title: String, $content: String) {
   *       createPost(title: $title, content: $content) {
   *         slug
   *       }
   *     }
   *   </script>
   *   <mwc-textfield label="Post title" data-variable="title"></mwc-textfield>
   *   <mwc-textarea label="Post Content" data-variable="content"></mwc-textarea>
   * </apollo-mutation>
   *
   * <script>
   *   document.getElementById('mutation').resolveURL =
   *     data => `/posts/${data.createPost.slug}/`;
   * </script>
   * ```
   * @param data mutation data
   * @param trigger the trigger element which triggered this mutation
   * @returns url to navigate to
   */
  resolveURL?(data: I.Data<D>, trigger: HTMLElement): string | Promise<string>;

  constructor() {
    super();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const el = this;
    Object.defineProperty(this.controller, 'variables', {
      get(): I.Variables<D, V> | null {
        if (this.__variables)
          return this.__variables;
        else
          return el.getVariablesFromInputs() ?? el.getDOMVariables() as I.Variables<D, V>;
      },

      set(v: I.Variables<D, V> | null) {
        this.__variables = v ?? undefined;
      },
    });

    this.onSlotchange();
  }

  private onLightDomMutation(records: MutationRecord[]) {
    /* eslint-disable easy-loops/easy-loops */
    for (const record of records) {
      for (const node of record.removedNodes as NodeListOf<HTMLElement>) {
        const type = this.#listeners.get(node);
        if (type == null) return; /* c8 ignore next */
        node.removeEventListener(type, this.onTriggerEvent);
        this.#listeners.delete(node);
      }

      for (const node of record.addedNodes) {
        if (ApolloMutationElement.isTriggerNode(node))
          this.addTriggerListener(node);
      }
    }
    /* eslint-enable easy-loops/easy-loops */
  }

  private onSlotchange(): void {
    for (const button of this.buttons)
      this.addTriggerListener(button);
    for (const trigger of this.triggers)
      this.addTriggerListener(trigger);
  }

  private addTriggerListener(element: HTMLElement) {
    const eventType = element?.getAttribute?.('trigger') || 'click';

    if (
      !this.#listeners.has(element) &&
      element.hasAttribute('trigger') ||
      !element.closest('[trigger]')
    ) {
      element.addEventListener(eventType, this.onTriggerEvent, {
        passive: element.hasAttribute('passive'),
      });
      this.#listeners.set(element, eventType);
    }
  }

  private willMutate(trigger: HTMLElement): void {
    if (!this.dispatchEvent(new E.WillMutateEvent<D, V>(this)))
      throw new WillMutateError('mutation was canceled');

    this.inFlightTrigger = trigger;

    for (const button of this.buttons)
      button.disabled = true;

    for (const input of this.inputs)
      input.disabled = true;
  }

  private async willNavigate(
    data: I.Data<D>|null|undefined,
    triggeringElement: HTMLElement
  ): Promise<void> {
    if (!this.dispatchEvent(new E.WillNavigateEvent(this)))
      return;

    const href = triggeringElement.closest<HTMLAnchorElement>('a[trigger]')?.href;

    const url =
        typeof this.resolveURL !== 'function' ? href
        // If we get here without `data`, it's due to user error
      : await this.resolveURL(this.data!, triggeringElement); // eslint-disable-line @typescript-eslint/no-non-null-assertion

    history.replaceState(data, E.WillNavigateEvent.type, url);
  }

  private didMutate(): void {
    this.inFlightTrigger = null;

    for (const button of this.buttons)
      button.disabled = false;

    for (const input of this.inputs)
      input.disabled = false;
  }

  @bound private onTriggerEvent(event: Event): void {
    event.preventDefault();

    if (this.inFlightTrigger)
      return;

    try {
      this.willMutate(event.target as HTMLElement);
    } catch (e) {
      return;
    }

    this.debouncedMutate();
  }

  protected createRenderRoot(): ShadowRoot|HTMLElement {
    if (this.hasAttribute('no-shadow')) {
      const root = this.appendChild(document.createElement('div'));
      root.classList.add(this.getAttribute('no-shadow') || 'output');
      this.#buttonMO = new MutationObserver(records => this.onLightDomMutation(records));
      this.#buttonMO.observe(this, { childList: true, attributes: false, characterData: false });
      return root;
    } else
      return super.createRenderRoot();
  }

  /**
   * Constructs a variables object from the element's data-attributes and any slotted variable inputs.
   */
  protected getVariablesFromInputs(): I.Variables<D, V> | null {
    if (isEmpty(this.dataset) && isEmpty(this.inputs))
      return null;

    const input = {
      ...this.dataset,
      ...this.inputs.reduce(ApolloMutationElement.toVariables, {}),
    };

    if (this.inputKey)
      return { [this.inputKey]: input } as unknown as I.Variables<D, V>;
    else
      return input as I.Variables<D, V>;
  }

  update(changed: PropertyValues<this>): void {
    if (changed.has('debounce')) {
      this.debouncedMutate =
          this.debounce == null ? this.doMutate
        : ApolloMutationElement.debounce(this.doMutate, this.debounce);
    }
    super.update(changed);
  }

  /**
   * A function which updates the apollo cache when the query responds.
   * This function will be called twice over the lifecycle of a mutation.
   * Once at the very beginning if an optimisticResponse was provided.
   * The writes created from the optimistic data will be rolled back before
   * the second time this function is called which is when the mutation has
   * succesfully resolved. At that point update will be called with the actual
   * mutation result and those writes will not be rolled back.
   *
   * The reason a DataProxy is provided instead of the user calling the methods
   * directly on ApolloClient is that all of the writes are batched together at
   * the end of the update, and it allows for writes generated by optimistic
   * data to be rolled back.
   */
  public updater?(
    ...params: Parameters<MutationUpdaterFn<I.Data<D>>>
  ): ReturnType<MutationUpdaterFn<I.Data<D>>>;

  public mutate(params?: P<D, V, 'mutate'>[0]): R<D, V, 'mutate'> {
    return this.controller.mutate({ ...params, update: this.updater });
  }
}
