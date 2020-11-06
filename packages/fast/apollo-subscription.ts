import { ApolloElement } from './apollo-element';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';
import { ApolloSubscriptionInterface, Constructor } from '@apollo-elements/interfaces';

/**
 * `ApolloSubscription`
 *
 * 🚀 Custom element base class that updates with an Apollo GraphQL subscription.
 *
 */
export class ApolloSubscription<TData, TVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloSubscriptionMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloSubscriptionInterface<TData, TVariables> {
}