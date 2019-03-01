/// <reference types="node" />
import http from 'http';
import { ApolloServer as ApolloServerBase, CorsOptions } from 'apollo-server-express';
import { Config } from 'apollo-server-core';
export * from './exports';
export interface ServerInfo {
    address: string;
    family: string;
    url: string;
    subscriptionsUrl: string;
    port: number | string;
    subscriptionsPath: string;
    server: http.Server;
}
export declare class ApolloServer extends ApolloServerBase {
    private httpServer?;
    private cors?;
    constructor(config: Config & {
        cors?: CorsOptions | boolean;
    });
    private createServerInfo;
    applyMiddleware(): void;
    listen(...opts: Array<any>): Promise<ServerInfo>;
    stop(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map