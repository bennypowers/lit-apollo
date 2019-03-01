const expect = require("unexpected");
const sequenceFromString = require("./sequenceFromString");

describe("sequenceFromString", () => {
  it("consolidates 'inputs'", () => {
    const seq = `
      foobar

      >>> input ENTER
      >>> input n

      baz
    `;
    expect(sequenceFromString, "when called with", [seq], "to equal", [
      { type: "find", value: "foobar" },
      { type: "input", value: ["ENTER", "n"] },
      { type: "find", value: "baz" },
    ]);
  });

  it("consolidates 'finds'", () => {
    const seq = `
      foobar
      quix

      >>> input ENTER

      baz
    `;
    expect(sequenceFromString, "when called with", [seq], "to equal", [
      { type: "find", value: ["foobar", "quix"] },
      { type: "input", value: "ENTER" },
      { type: "find", value: "baz" },
    ]);
  });

  it("TODO", () => {
    const seq = `
      foobar
      quix

      >>> wait 2s

      quiz

      >>> input ENTER

      baz
    `;
    expect(sequenceFromString, "when called with", [seq], "to equal", [
      { type: "find", value: ["foobar", "quix"] },
      { type: "wait", value: "2s" },
      { type: "find", value: "quiz" },
      { type: "input", value: "ENTER" },
      { type: "find", value: "baz" },
    ]);
  });
});
