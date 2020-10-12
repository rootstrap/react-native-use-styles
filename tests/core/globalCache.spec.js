import {
  setInCache,
  getFromCache,
  clearCache
} from "../../src/core/globalCache";

const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

describe("utils", () => {
  beforeEach(() => {
    clearCache();
    consoleSpy.mockClear();
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
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith('Non-Existent-Namespace: The following namespace does not exist or has not been imported: "namespace". You are seeing this warning because you are in development mode. In a production build there will be no warning and these styles will be ignored.');
  });

  it("getFromCache doesn't get from cache", async () => {
    expect(getFromCache("style", "namespace")).toBe(undefined);
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith('Non-Existent-Namespace: The following namespace does not exist or has not been imported: "namespace". You are seeing this warning because you are in development mode. In a production build there will be no warning and these styles will be ignored.');
  });
});
