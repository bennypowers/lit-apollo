"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const zlib_1 = require("zlib");
const apollo_engine_reporting_protobuf_1 = require("apollo-engine-reporting-protobuf");
const apollo_server_env_1 = require("apollo-server-env");
const async_retry_1 = __importDefault(require("async-retry"));
const extension_1 = require("./extension");
const serviceHeaderDefaults = {
    hostname: os_1.default.hostname(),
    agentVersion: `apollo-engine-reporting@${require('../package.json').version}`,
    runtimeVersion: `node ${process.version}`,
    uname: `${os_1.default.platform()}, ${os_1.default.type()}, ${os_1.default.release()}, ${os_1.default.arch()})`,
};
class EngineReportingAgent {
    constructor(options = {}, { schemaHash }) {
        this.stopped = false;
        this.options = options;
        this.apiKey = options.apiKey || process.env.ENGINE_API_KEY || '';
        if (!this.apiKey) {
            throw new Error('To use EngineReportingAgent, you must specify an API key via the apiKey option or the ENGINE_API_KEY environment variable.');
        }
        this.reportHeader = new apollo_engine_reporting_protobuf_1.ReportHeader(Object.assign({}, serviceHeaderDefaults, { schemaHash, schemaTag: options.schemaTag || process.env.ENGINE_SCHEMA_TAG || '' }));
        this.resetReport();
        this.sendReportsImmediately = options.sendReportsImmediately;
        if (!this.sendReportsImmediately) {
            this.reportTimer = setInterval(() => this.sendReportAndReportErrors(), this.options.reportIntervalMs || 10 * 1000);
        }
        if (this.options.handleSignals !== false) {
            const signals = ['SIGINT', 'SIGTERM'];
            signals.forEach(signal => {
                process.once(signal, () => __awaiter(this, void 0, void 0, function* () {
                    this.stop();
                    yield this.sendReportAndReportErrors();
                    process.kill(process.pid, signal);
                }));
            });
        }
    }
    newExtension() {
        return new extension_1.EngineReportingExtension(this.options, this.addTrace.bind(this));
    }
    addTrace(signature, operationName, trace) {
        if (this.stopped) {
            return;
        }
        const protobufError = apollo_engine_reporting_protobuf_1.Trace.verify(trace);
        if (protobufError) {
            throw new Error(`Error encoding trace: ${protobufError}`);
        }
        const encodedTrace = apollo_engine_reporting_protobuf_1.Trace.encode(trace).finish();
        const statsReportKey = `# ${operationName || '-'}\n${signature}`;
        if (!this.report.tracesPerQuery.hasOwnProperty(statsReportKey)) {
            this.report.tracesPerQuery[statsReportKey] = new apollo_engine_reporting_protobuf_1.Traces();
            this.report.tracesPerQuery[statsReportKey].encodedTraces = [];
        }
        this.report.tracesPerQuery[statsReportKey].encodedTraces.push(encodedTrace);
        this.reportSize += encodedTrace.length + Buffer.byteLength(statsReportKey);
        if (this.sendReportsImmediately ||
            this.reportSize >=
                (this.options.maxUncompressedReportSize || 4 * 1024 * 1024)) {
            this.sendReportAndReportErrors();
        }
    }
    sendReport() {
        return __awaiter(this, void 0, void 0, function* () {
            const report = this.report;
            this.resetReport();
            if (Object.keys(report.tracesPerQuery).length === 0) {
                return;
            }
            yield Promise.resolve();
            if (this.options.debugPrintReports) {
                console.log(`Engine sending report: ${JSON.stringify(report.toJSON())}`);
            }
            const protobufError = apollo_engine_reporting_protobuf_1.FullTracesReport.verify(report);
            if (protobufError) {
                throw new Error(`Error encoding report: ${protobufError}`);
            }
            const message = apollo_engine_reporting_protobuf_1.FullTracesReport.encode(report).finish();
            const compressed = yield new Promise((resolve, reject) => {
                const messageBuffer = Buffer.from(message.buffer, message.byteOffset, message.byteLength);
                zlib_1.gzip(messageBuffer, (err, gzipResult) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(gzipResult);
                    }
                });
            });
            const endpointUrl = (this.options.endpointUrl || 'https://engine-report.apollodata.com') +
                '/api/ingress/traces';
            const response = yield async_retry_1.default(() => __awaiter(this, void 0, void 0, function* () {
                const curResponse = yield apollo_server_env_1.fetch(endpointUrl, {
                    method: 'POST',
                    headers: {
                        'user-agent': 'apollo-engine-reporting',
                        'x-api-key': this.apiKey,
                        'content-encoding': 'gzip',
                    },
                    body: compressed,
                    agent: this.options.requestAgent,
                });
                if (curResponse.status >= 500 && curResponse.status < 600) {
                    throw new Error(`${curResponse.status}: ${curResponse.statusText}`);
                }
                else {
                    return curResponse;
                }
            }), {
                retries: this.options.maxAttempts || 5,
                minTimeout: this.options.minimumRetryDelayMs || 100,
                factor: 2,
            }).catch((err) => {
                throw new Error(`Error sending report to Engine servers: ${err}`);
            });
            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Error sending report to Engine servers (HTTP status ${response.status}): ${yield response.text()}`);
            }
            if (this.options.debugPrintReports) {
                console.log(`Engine report: status ${response.status}`);
            }
        });
    }
    stop() {
        if (this.reportTimer) {
            clearInterval(this.reportTimer);
            this.reportTimer = undefined;
        }
        this.stopped = true;
    }
    sendReportAndReportErrors() {
        return this.sendReport().catch(err => {
            if (this.options.reportErrorFunction) {
                this.options.reportErrorFunction(err);
            }
            else {
                console.error(err.message);
            }
        });
    }
    resetReport() {
        this.report = new apollo_engine_reporting_protobuf_1.FullTracesReport({ header: this.reportHeader });
        this.reportSize = 0;
    }
}
exports.EngineReportingAgent = EngineReportingAgent;
//# sourceMappingURL=agent.js.map