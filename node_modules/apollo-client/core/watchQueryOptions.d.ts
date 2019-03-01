import { DocumentNode, ExecutionResult } from 'graphql';
import { FetchResult } from 'apollo-link';
import { DataProxy } from 'apollo-cache';
import { MutationQueryReducersMap } from './types';
import { PureQueryOptions, OperationVariables } from './types';
export declare type FetchPolicy = 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';
export declare type ErrorPolicy = 'none' | 'ignore' | 'all';
export interface QueryBaseOptions<TVariables = OperationVariables> {
    variables?: TVariables;
    fetchPolicy?: FetchPolicy;
    errorPolicy?: ErrorPolicy;
    fetchResults?: boolean;
}
export interface QueryOptions<TVariables = OperationVariables> extends QueryBaseOptions<TVariables> {
    query: DocumentNode;
    metadata?: any;
    context?: any;
}
export interface ModifiableWatchQueryOptions<TVariables = OperationVariables> extends QueryBaseOptions<TVariables> {
    pollInterval?: number;
    notifyOnNetworkStatusChange?: boolean;
}
export interface WatchQueryOptions<TVariables = OperationVariables> extends QueryOptions<TVariables>, ModifiableWatchQueryOptions<TVariables> {
}
export interface FetchMoreQueryOptions<TVariables, K extends keyof TVariables> {
    query?: DocumentNode;
    variables?: Pick<TVariables, K>;
}
export declare type UpdateQueryFn<TData = any, TVariables = OperationVariables, TSubscriptionData = TData> = (previousQueryResult: TData, options: {
    subscriptionData: {
        data: TSubscriptionData;
    };
    variables?: TVariables;
}) => TData;
export declare type SubscribeToMoreOptions<TData = any, TVariables = OperationVariables, TSubscriptionData = TData> = {
    document: DocumentNode;
    variables?: TVariables;
    updateQuery?: UpdateQueryFn<TData, TVariables, TSubscriptionData>;
    onError?: (error: Error) => void;
};
export interface SubscriptionOptions<TVariables = OperationVariables> {
    query: DocumentNode;
    variables?: TVariables;
    fetchPolicy?: FetchPolicy;
}
export declare type RefetchQueryDescription = Array<string | PureQueryOptions>;
export interface MutationBaseOptions<T = {
    [key: string]: any;
}, TVariables = OperationVariables> {
    optimisticResponse?: Object | Function;
    updateQueries?: MutationQueryReducersMap<T>;
    refetchQueries?: ((result: ExecutionResult) => RefetchQueryDescription) | RefetchQueryDescription;
    awaitRefetchQueries?: boolean;
    update?: MutationUpdaterFn<T>;
    errorPolicy?: ErrorPolicy;
    variables?: TVariables;
}
export interface MutationOptions<T = {
    [key: string]: any;
}, TVariables = OperationVariables> extends MutationBaseOptions<T, TVariables> {
    mutation: DocumentNode;
    context?: any;
    fetchPolicy?: FetchPolicy;
}
export declare type MutationUpdaterFn<T = {
    [key: string]: any;
}> = (proxy: DataProxy, mutationResult: FetchResult<T>) => void;
//# sourceMappingURL=watchQueryOptions.d.ts.map