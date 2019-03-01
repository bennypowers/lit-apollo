"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_extensions_1 = require("graphql-extensions");
const apollo_server_errors_1 = require("apollo-server-errors");
class FormatErrorExtension extends graphql_extensions_1.GraphQLExtension {
    constructor(formatError, debug = false) {
        super();
        this.formatError = formatError;
        this.debug = debug;
    }
    willSendResponse(o) {
        if (o.graphqlResponse.errors) {
            return Object.assign({}, o, { graphqlResponse: Object.assign({}, o.graphqlResponse, { errors: apollo_server_errors_1.formatApolloErrors(o.graphqlResponse.errors, {
                        formatter: this.formatError,
                        debug: this.debug,
                    }) }) });
        }
    }
}
exports.FormatErrorExtension = FormatErrorExtension;
//# sourceMappingURL=formatters.js.map