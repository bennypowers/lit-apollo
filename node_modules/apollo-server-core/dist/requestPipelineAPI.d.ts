import { Request, Response } from 'apollo-server-env';
import { GraphQLSchema, ValidationContext, ASTVisitor, GraphQLError, OperationDefinitionNode, DocumentNode } from 'graphql';
import { KeyValueCache } from 'apollo-server-caching';
export interface GraphQLServiceContext {
    schema: GraphQLSchema;
    schemaHash: string;
    engine: {
        serviceID?: string;
    };
    persistedQueries?: {
        cache: KeyValueCache;
    };
}
export interface GraphQLRequest {
    query?: string;
    operationName?: string;
    variables?: {
        [name: string]: any;
    };
    extensions?: Record<string, any>;
    http?: Pick<Request, 'url' | 'method' | 'headers'>;
}
export interface GraphQLResponse {
    data?: Record<string, any>;
    errors?: GraphQLError[];
    extensions?: Record<string, any>;
    http?: Pick<Response, 'headers'>;
}
export interface GraphQLRequestContext<TContext = Record<string, any>> {
    readonly request: GraphQLRequest;
    readonly response?: GraphQLResponse;
    readonly context: TContext;
    readonly cache: KeyValueCache;
    readonly queryHash?: string;
    readonly document?: DocumentNode;
    readonly operationName?: string | null;
    readonly operation?: OperationDefinitionNode;
    debug?: boolean;
}
export declare type ValidationRule = (context: ValidationContext) => ASTVisitor;
export declare class InvalidGraphQLRequestError extends Error {
}
//# sourceMappingURL=requestPipelineAPI.d.ts.map