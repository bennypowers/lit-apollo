import { Request } from 'apollo-server-env';
import { GraphQLResolveInfo, DocumentNode, ExecutionArgs } from 'graphql';
import { GraphQLExtension, GraphQLResponse, EndHandler } from 'graphql-extensions';
import { Trace } from 'apollo-engine-reporting-protobuf';
import { EngineReportingOptions } from './agent';
import { GraphQLRequestContext } from 'apollo-server-core/dist/requestPipelineAPI';
export declare class EngineReportingExtension<TContext = any> implements GraphQLExtension<TContext> {
    trace: Trace;
    private nodes;
    private startHrTime;
    private operationName?;
    private queryString?;
    private documentAST?;
    private options;
    private addTrace;
    private generateClientInfo;
    constructor(options: EngineReportingOptions<TContext>, addTrace: (signature: string, operationName: string, trace: Trace) => void);
    requestDidStart(o: {
        request: Request;
        queryString?: string;
        parsedQuery?: DocumentNode;
        variables?: Record<string, any>;
        persistedQueryHit?: boolean;
        persistedQueryRegister?: boolean;
        context: TContext;
        extensions?: Record<string, any>;
        requestContext: GraphQLRequestContext<TContext>;
    }): EndHandler;
    executionDidStart(o: {
        executionArgs: ExecutionArgs;
    }): void;
    willResolveField(_source: any, _args: {
        [argName: string]: any;
    }, _context: TContext, info: GraphQLResolveInfo): ((error: Error | null, result: any) => void) | void;
    willSendResponse(o: {
        graphqlResponse: GraphQLResponse;
    }): void;
    private newNode;
    private ensureParentNode;
}
//# sourceMappingURL=extension.d.ts.map