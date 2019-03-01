export default (function (done, cb) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    try {
        return cb.apply(void 0, args);
    }
    catch (e) {
        done.fail(e);
    }
}; });
export function withWarning(func, regex) {
    var message = null;
    var oldWarn = console.warn;
    console.warn = function (m) { return (message = m); };
    return Promise.resolve(func()).then(function (val) {
        expect(message).toMatch(regex);
        console.warn = oldWarn;
        return val;
    });
}
export function withError(func, regex) {
    var message = null;
    var oldError = console.error;
    console.error = function (m) { return (message = m); };
    try {
        var result = func();
        expect(message).toMatch(regex);
        return result;
    }
    finally {
        console.error = oldError;
    }
}
//# sourceMappingURL=wrap.js.map