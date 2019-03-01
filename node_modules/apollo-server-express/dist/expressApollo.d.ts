import express from 'express';
import { GraphQLOptions } from 'apollo-server-core';
export interface ExpressGraphQLOptionsFunction {
    (req?: express.Request, res?: express.Response): GraphQLOptions | Promise<GraphQLOptions>;
}
export declare function graphqlExpress(options: GraphQLOptions | ExpressGraphQLOptionsFunction): express.Handler;
//# sourceMappingURL=expressApollo.d.ts.map