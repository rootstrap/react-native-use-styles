import {
  setInCache,
  getFromCache,
  clearCache
} from "../../src/core/globalCache";

describe("utils", () => {
  beforeEach(() => {
    clearCache();
  });

  it("setInCache sets in global cache properly", async () => {
    setInCache({ style: true });
    expect(getFromCache("style")).toBe(true);
  });

  it("setInCache sets in namespaced cache properly", async () => {
    setInCache({ style: true }, "namespace");
    expect(getFromCache("style", "namespace")).toBe(true);
  });

  it("getFromCache gets in global cache when namespaced", async () => {
    setInCache({ style: true });
    expect(getFromCache("style", "namespace")).toBe(true);
  });

  it("getFromCache doesn't get from cache", async () => {
    expect(getFromCache("style", "namespace")).toBe(undefined);
  });
});
