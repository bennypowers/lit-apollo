import { ApolloLink, RequestHandler } from 'apollo-link';
import { HttpOptions, UriFunction as _UriFunction } from 'apollo-link-http-common';
export declare namespace HttpLink {
    interface UriFunction extends _UriFunction {
    }
    interface Options extends HttpOptions {
        /**
         * If set to true, use the HTTP GET method for query operations. Mutations
         * will still use the method specified in fetchOptions.method (which defaults
         * to POST).
         */
        useGETForQueries?: boolean;
    }
}
export import FetchOptions = HttpLink.Options;
export import UriFunction = HttpLink.UriFunction;
export declare const createHttpLink: (linkOptions?: FetchOptions) => ApolloLink;
export declare class HttpLink extends ApolloLink {
    requester: RequestHandler;
    constructor(opts?: HttpLink.Options);
}
