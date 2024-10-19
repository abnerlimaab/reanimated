function isNumber(x: unknown): x is number {
  return typeof x === "number";
}

export default {
  isNumber,
};
