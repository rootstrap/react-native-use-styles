import {
  isClassName,
  getKey,
  getNamespace,
  isNamespace,
  isFalseyString,
  flattenStyles,
  getPathFromLiteralTag,
  isConstant,
  isComputed,
  hasComputed
} from "../../src/utils";

describe("utils", () => {
  it("isComputed finds the computed", async () => {
    expect(isComputed("&computed")).toBe(true);
  });

  it("isComputed finds the computed when is namespaced", async () => {
    expect(isComputed("@namespace&isComputed")).toBe(true);
  });

  it("isComputed doesn't find the computed", async () => {
    expect(isComputed("fx:dir:row")).toBe(false);
  });

  it("hasComputed finds the computed", async () => {
    expect(hasComputed(".classname &computed")).toBe(true);
  });

  it("hasComputed doesn't find the computed", async () => {
    expect(hasComputed("fx:dir:row")).toBe(false);
  });

  it("isClassName finds the class", async () => {
    expect(isClassName(".classname")).toBe(true);
  });

  it("isClassName finds the class when is namespaced", async () => {
    expect(isClassName("@namespace.classname")).toBe(true);
  });

  it("isClassName doesn't find the class", async () => {
    expect(isClassName("fx:dir:row")).toBe(false);
  });

  it("getKeyFromPath gets the key", async () => {
    expect(getKey(".local")).toBe("local");
  });

  it("isNamespaceClass finds the namespace", async () => {
    expect(isNamespace("@namespace.classname")).toBe(true);
  });

  it("isNamespaceClass doesn't find the namespace", async () => {
    expect(isNamespace(".classname")).toBe(false);
  });

  it("getNamespace gets the namespace", async () => {
    expect(getNamespace("@namespace.classname")).toBe("namespace");
  });

  it("isFalseyString when undefined is falsey", async () => {
    expect(isFalseyString("undefined")).toBe(true);
  });

  it("isFalseyString when false is falsey", async () => {
    expect(isFalseyString("false")).toBe(true);
  });

  it("isFalseyString when class is truthy", async () => {
    expect(isFalseyString(".class")).toBe(false);
  });

  it("flattenStyles flattens the array properly", async () => {
    const styles = [{ flex: 1, color: "red" }, { color: "blue" }];
    const expected = { flex: 1, color: "blue" };
    expect(flattenStyles(styles)).toMatchObject(expected);
  });

  it("getPathFromLiteralTag flattens the array properly", async () => {
    const strings = ["Hello ", "!"];
    const expressions = ["World"];
    const expected = "Hello World!";
    expect(getPathFromLiteralTag(strings, expressions)).toBe(expected);
  });

  it("isConstant finds a constant", async () => {
    expect(isConstant("$constant")).toBe(true);
  });

  it("isConstant doesn't find a constant", async () => {
    expect(isConstant(".class")).toBe(false);
  });

  it("isConstant finds a namespaced constant", async () => {
    expect(isConstant("@namespace$constant")).toBe(true);
  });
});
