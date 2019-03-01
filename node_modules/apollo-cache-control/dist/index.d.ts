import { GraphQLResolveInfo, ResponsePath } from 'graphql';
import { GraphQLExtension, GraphQLResponse } from 'graphql-extensions';
export interface CacheControlFormat {
    version: 1;
    hints: ({
        path: (string | number)[];
    } & CacheHint)[];
}
export interface CacheHint {
    maxAge?: number;
    scope?: CacheScope;
}
export declare enum CacheScope {
    Public = "PUBLIC",
    Private = "PRIVATE"
}
export interface CacheControlExtensionOptions {
    defaultMaxAge?: number;
    calculateHttpHeaders?: boolean;
    stripFormattedExtensions?: boolean;
}
declare module 'graphql/type/definition' {
    interface GraphQLResolveInfo {
        cacheControl: {
            setCacheHint: (hint: CacheHint) => void;
            cacheHint: CacheHint;
        };
    }
}
export declare class CacheControlExtension<TContext = any> implements GraphQLExtension<TContext> {
    options: CacheControlExtensionOptions;
    private defaultMaxAge;
    constructor(options?: CacheControlExtensionOptions);
    private hints;
    willResolveField(_source: any, _args: {
        [argName: string]: any;
    }, _context: TContext, info: GraphQLResolveInfo): void;
    addHint(path: ResponsePath, hint: CacheHint): void;
    format(): [string, CacheControlFormat] | undefined;
    willSendResponse?(o: {
        graphqlResponse: GraphQLResponse;
    }): void;
    computeOverallCachePolicy(): Required<CacheHint> | undefined;
}
//# sourceMappingURL=index.d.ts.map