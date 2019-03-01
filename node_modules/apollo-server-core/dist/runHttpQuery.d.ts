import { Request } from 'apollo-server-env';
import { default as GraphQLOptions } from './graphqlOptions';
import { WithRequired } from 'apollo-server-plugin-base';
export interface HttpQueryRequest {
    method: string;
    query: Record<string, any> | Array<Record<string, any>>;
    options: GraphQLOptions | ((...args: Array<any>) => Promise<GraphQLOptions> | GraphQLOptions);
    request: Pick<Request, 'url' | 'method' | 'headers'>;
}
export interface ApolloServerHttpResponse {
    headers?: Record<string, string>;
}
export interface HttpQueryResponse {
    graphqlResponse: string;
    responseInit: ApolloServerHttpResponse;
}
export declare class HttpQueryError extends Error {
    statusCode: number;
    isGraphQLError: boolean;
    headers?: {
        [key: string]: string;
    };
    constructor(statusCode: number, message: string, isGraphQLError?: boolean, headers?: {
        [key: string]: string;
    });
}
export declare function runHttpQuery(handlerArguments: Array<any>, request: HttpQueryRequest): Promise<HttpQueryResponse>;
export declare function processHTTPRequest<TContext>(options: WithRequired<GraphQLOptions<TContext>, 'cache' | 'plugins'> & {
    context: TContext;
}, httpRequest: HttpQueryRequest): Promise<HttpQueryResponse>;
//# sourceMappingURL=runHttpQuery.d.ts.map