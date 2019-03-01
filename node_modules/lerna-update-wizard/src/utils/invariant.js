module.exports = (condition, ...lines) => {
  if (!condition) {
    throw new Error(lines.join("\n"));
  }
};
