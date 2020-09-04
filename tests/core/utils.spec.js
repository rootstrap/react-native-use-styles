import {
  isClassName,
  getClassName,
  getNamespace,
  isNamespaceClass,
  isFalseyString,
  flattenStyles,
  getPathFromLiteralTag
} from "../../src/core/utils";

describe("utils", () => {
  it("fisClassName finds the class", async () => {
    expect(isClassName(".classname")).toBe(true);
  });

  it("fisClassName finds the class when is namespaced", async () => {
    expect(isClassName("@namespace.classname")).toBe(false);
  });

  it("isClassName doesn't find the class", async () => {
    expect(isClassName("fx:dir:row")).toBe(false);
  });

  it("getClassName gets the class", async () => {
    expect(getClassName(".local")).toBe("local");
  });

  it("isNamespaceClass finds the namespace", async () => {
    expect(isNamespaceClass("@namespace.classname")).toBe(true);
  });

  it("isNamespaceClass doesn't find the namespace", async () => {
    expect(isNamespaceClass(".classname")).toBe(false);
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
});
