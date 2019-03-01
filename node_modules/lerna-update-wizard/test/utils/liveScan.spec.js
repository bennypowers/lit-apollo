const unexpected = require("unexpected");
const unexpectedSinon = require("unexpected-sinon");
const sinon = require("sinon");
const expect = unexpected.clone().use(unexpectedSinon);

const { match, scan: liveScan } = require("./liveScan");

describe("liveScan", () => {
  it("liveScan.match", () => {
    expect(
      match,
      "when called with",
      [
        [
          "\u001b[2K\u001b[G",
          "Lerna Update Wizard",
          "v0.9.0",
          "",
          "\u001b[2K\u001b[G\u001b[2K\u001b[GStarting update wizard for project-a",
          "\u001b[2K\u001b[G",
          "? Select a dependency to upgrade: (Use arrow keys or type to search)",
          "❯ lodash (1 version) ",
          "  treediff (1 version) \u001b[2A\u001b[23D\u001b[68C",
        ],
        [
          "? Select a dependency to upgrade: (Use arrow keys or type to search)",
        ],
      ],
      "to equal",
      {
        matchTarget:
          "? Select a dependency to upgrade: (Use arrow keys or type to search)",
        matchContext:
          "\x1b[2K\x1b[G\nLerna Update Wizard\nv0.9.0\n\n\x1b[2K\x1b[G\x1b[2K\x1b[GStarting update wizard for project-a\n\x1b[2K\x1b[G",
      }
    );

    expect(
      match,
      "when called with",
      [["a", "b", "c", "dd", "e"], ["a"]],
      "to equal",
      { matchTarget: "a", matchContext: "" }
    );

    expect(
      match,
      "when called with",
      [
        ["test", "marc", "foo", "bar", ""],
        ["", "        foo", "        bar"].filter(Boolean),
      ],
      "to equal",
      { matchTarget: "foo\nbar", matchContext: "test\nmarc" }
    );
  });

  it("finds line in simple target", () => {
    const findSpy = sinon.spy();

    const { feed } = liveScan({
      target: "foo",
      onFind: findSpy,
    });

    feed("foo");

    expect(findSpy, "was called with", {
      matchTarget: "foo",
      matchContext: "",
    });
  });

  it("liveScan.reset works", () => {
    const findSpy = sinon.spy();

    const { feed, reset } = liveScan({
      target: `
        foo
        bar
      `,
      onFind: findSpy,
    });

    feed("test\n");
    feed("marc\n");
    feed("foo\n");

    expect(findSpy, "was not called");

    feed("bar\n");

    expect(findSpy, "was called");

    findSpy.resetHistory();

    reset({
      target: `
        quix
        quza
        killa`,
    });

    // After resetting, we expect that the scanner does not react to the old target
    feed("marc\n");
    feed("foo\n");

    expect(findSpy, "was not called");

    // (Break up the feed input, just to make the test more real-life like)
    feed("quix\nquza\n");
    feed("killa");

    expect(findSpy, "was called");
  });
  it("finds line in multiline target", () => {
    const findSpy = sinon.spy();

    const { feed } = liveScan({
      target: `
        foo
        bar
      `,
      onFind: findSpy,
    });

    feed("test\n");
    feed("marc\n");
    feed("foo\n");

    expect(findSpy, "was not called");

    feed("bar\n");

    expect(findSpy, "was called");
  });

  it("times out when not found", () => {
    const timeoutSpy = sinon.spy();

    const { feed } = liveScan({
      target: `
        foo
        quix
      `,
      timeout: 500,
      onTimeout: timeoutSpy,
    });

    feed("test\n");
    feed("foo\n");
    feed("bar\n");

    return new Promise(resolve => {
      setTimeout(() => {
        expect(timeoutSpy, "was called");
        resolve();
      }, 1000);
    });
  });
});
