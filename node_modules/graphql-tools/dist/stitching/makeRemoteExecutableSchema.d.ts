import { ApolloLink } from 'apollo-link';
import { GraphQLFieldResolver, GraphQLSchema, ExecutionResult, GraphQLResolveInfo, DocumentNode } from 'graphql';
export declare type ResolverFn = (rootValue?: any, args?: any, context?: any, info?: GraphQLResolveInfo) => AsyncIterator<any>;
export declare type Fetcher = (operation: FetcherOperation) => Promise<ExecutionResult>;
export declare type FetcherOperation = {
    query: DocumentNode;
    operationName?: string;
    variables?: {
        [key: string]: any;
    };
    context?: {
        [key: string]: any;
    };
};
export default function makeRemoteExecutableSchema({ schema, link, fetcher, createResolver: customCreateResolver }: {
    schema: GraphQLSchema | string;
    link?: ApolloLink;
    fetcher?: Fetcher;
    createResolver?: (fetcher: Fetcher) => GraphQLFieldResolver<any, any>;
}): GraphQLSchema;
export declare function createResolver(fetcher: Fetcher): GraphQLFieldResolver<any, any>;
