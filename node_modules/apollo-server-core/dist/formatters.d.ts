import { GraphQLExtension, GraphQLResponse } from 'graphql-extensions';
export declare class FormatErrorExtension<TContext = any> extends GraphQLExtension {
    private formatError?;
    private debug;
    constructor(formatError?: Function, debug?: boolean);
    willSendResponse(o: {
        graphqlResponse: GraphQLResponse;
        context: TContext;
    }): void | {
        graphqlResponse: GraphQLResponse;
        context: TContext;
    };
}
//# sourceMappingURL=formatters.d.ts.map