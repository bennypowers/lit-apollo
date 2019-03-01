const unexpected = require("unexpected");
const unexpectedSinon = require("unexpected-sinon");
const { run } = require("./runProgram");
const sinon = require("sinon");

const expect = unexpected.clone().use(unexpectedSinon);

const runWithMock = instruction => {
  let handlers = {
    data: [],
    end: [],
  };

  const writeSpy = sinon.spy();

  const proc = {
    stdout: {
      removeAllListeners: () => {
        handlers.data = handlers.end = [];
      },
      on: (type, handler) => (handlers[type] = [...handlers[type], handler]),
    },
    stdin: {
      write: writeSpy,
      addListener: () => {},
    },
  };

  const promise = run(proc, instruction);

  return {
    writeSpy,
    promise,
    handlers,
  };
};

describe("runProgram", () => {
  it("wait", () => {
    const { promise, handlers } = runWithMock({
      type: "wait",
      value: undefined,
    });

    handlers.data.forEach(handler => handler("foobar"));

    return promise;
  });

  it("find", () => {
    const { promise, handlers } = runWithMock({
      type: "find",
      value: "foobar",
    });

    handlers.data.forEach(handler => handler("foobar"));

    return promise;
  });

  it("find multiple", () => {
    const { promise, handlers } = runWithMock({
      type: "find",
      value: ["foobar", "baz"],
    });

    handlers.data.forEach(handler => handler("foobar\nbaz"));

    return promise;
  });

  it("input", () => {
    const { promise, writeSpy } = runWithMock({
      type: "input",
      value: "foobar",
    });

    expect(writeSpy, "was called with", "foobar");

    return promise;
  });

  it("input multiple", async () => {
    const { promise, writeSpy } = runWithMock({
      type: "input",
      value: ["foobar", "baz"],
    });

    await promise;

    expect(writeSpy, "to have calls satisfying", [
      ["foobar", expect.it("to be a string"), expect.it("to be a function")],
      ["baz", expect.it("to be a string"), expect.it("to be a function")],
    ]);
  });
});
