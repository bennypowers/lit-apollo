const ensureArray = val => (Array.isArray(val) ? val : [val]);

const Instruction = (type, value) => ({ type, value });

const instructionFromLine = line => {
  if (!line.startsWith(">>> ")) {
    return Instruction("find", line);
  }

  // eslint-disable-next-line no-unused-vars
  const [_, type, value] = line.split(" ");

  if (!["find", "wait", "input"].includes(type)) {
    return Instruction("find", line);
  }

  return Instruction(type, value);
};

const arrayReplaceLast = (array, replacement) => [
  ...array.slice(0, array.length - 1),
  replacement,
];

module.exports = instructionsString =>
  instructionsString
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.trim() !== "")
    .reduce((prev, line, idx) => {
      const instruction = instructionFromLine(line);

      if (prev.length === 0) return [instruction];

      const prevIndex = prev.length - 1;
      const prevInstruction = prev[prevIndex];

      switch (instruction.type) {
        case "find":
          if (prevInstruction.type === "find") {
            return arrayReplaceLast(
              prev,
              Instruction("find", [
                ...ensureArray(prevInstruction.value),
                instruction.value,
              ])
            );
          }
          break;
        case "input":
          if (prevInstruction.type === "input") {
            return arrayReplaceLast(
              prev,
              Instruction("input", [
                ...ensureArray(prevInstruction.value),
                instruction.value,
              ])
            );
          }
          break;
      }

      return [...prev, instruction];
    }, []);
