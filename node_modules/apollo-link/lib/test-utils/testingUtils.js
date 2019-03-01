var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
import { execute } from '../link';
var sampleQuery = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query SampleQuery {\n    stub {\n      id\n    }\n  }\n"], ["\n  query SampleQuery {\n    stub {\n      id\n    }\n  }\n"])));
export function checkCalls(calls, results) {
    if (calls === void 0) { calls = []; }
    expect(calls.length).toBe(results.length);
    calls.map(function (call, i) { return expect(call.data).toEqual(results[i]); });
}
export function testLinkResults(params) {
    var link = params.link, context = params.context, variables = params.variables;
    var results = params.results || [];
    var query = params.query || sampleQuery;
    var done = params.done || (function () { return void 0; });
    var spy = jest.fn();
    execute(link, { query: query, context: context, variables: variables }).subscribe({
        next: spy,
        error: function (error) {
            expect(error).toEqual(results.pop());
            checkCalls(spy.mock.calls[0], results);
            if (done) {
                done();
            }
        },
        complete: function () {
            checkCalls(spy.mock.calls[0], results);
            if (done) {
                done();
            }
        },
    });
}
var templateObject_1;
//# sourceMappingURL=testingUtils.js.map