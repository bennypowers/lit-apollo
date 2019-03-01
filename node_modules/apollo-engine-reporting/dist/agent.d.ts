import { DocumentNode } from 'graphql';
import { Trace } from 'apollo-engine-reporting-protobuf';
import { RequestAgent } from 'apollo-server-env';
import { EngineReportingExtension } from './extension';
import { GraphQLRequestContext, GraphQLServiceContext } from 'apollo-server-core/dist/requestPipelineAPI';
export interface ClientInfo {
    clientName?: string;
    clientVersion?: string;
    clientReferenceId?: string;
}
export declare type GenerateClientInfo<TContext> = (requestContext: GraphQLRequestContext<TContext>) => ClientInfo;
export interface EngineReportingOptions<TContext> {
    apiKey?: string;
    calculateSignature?: (ast: DocumentNode, operationName: string) => string;
    reportIntervalMs?: number;
    maxUncompressedReportSize?: number;
    endpointUrl?: string;
    debugPrintReports?: boolean;
    requestAgent?: RequestAgent | false;
    maxAttempts?: number;
    minimumRetryDelayMs?: number;
    reportErrorFunction?: (err: Error) => void;
    privateVariables?: Array<String> | boolean;
    privateHeaders?: Array<String> | boolean;
    handleSignals?: boolean;
    sendReportsImmediately?: boolean;
    maskErrorDetails?: boolean;
    schemaTag?: string;
    generateClientInfo?: GenerateClientInfo<TContext>;
}
export declare class EngineReportingAgent<TContext = any> {
    private options;
    private apiKey;
    private report;
    private reportSize;
    private reportTimer;
    private sendReportsImmediately?;
    private stopped;
    private reportHeader;
    constructor(options: EngineReportingOptions<TContext> | undefined, { schemaHash }: GraphQLServiceContext);
    newExtension(): EngineReportingExtension<TContext>;
    addTrace(signature: string, operationName: string, trace: Trace): void;
    sendReport(): Promise<void>;
    stop(): void;
    private sendReportAndReportErrors;
    private resetReport;
}
//# sourceMappingURL=agent.d.ts.map