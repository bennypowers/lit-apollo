import express from 'express';
import corsMiddleware from 'cors';
import { OptionsJson } from 'body-parser';
import { GraphQLOptions, ApolloServerBase } from 'apollo-server-core';
export { GraphQLOptions, GraphQLExtension } from 'apollo-server-core';
export interface ServerRegistration {
    app: express.Application;
    path?: string;
    cors?: corsMiddleware.CorsOptions | boolean;
    bodyParserConfig?: OptionsJson | boolean;
    onHealthCheck?: (req: express.Request) => Promise<any>;
    disableHealthCheck?: boolean;
}
export declare class ApolloServer extends ApolloServerBase {
    createGraphQLServerOptions(req: express.Request, res: express.Response): Promise<GraphQLOptions>;
    protected supportsSubscriptions(): boolean;
    protected supportsUploads(): boolean;
    applyMiddleware({ app, path, cors, bodyParserConfig, disableHealthCheck, onHealthCheck, }: ServerRegistration): void;
}
export declare const registerServer: () => never;
//# sourceMappingURL=ApolloServer.d.ts.map