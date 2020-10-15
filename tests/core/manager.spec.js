import { clearCache, getFromCache } from "../../src/core/cache";
import { GlobalStyles, GlobalUse } from "../../src/core/manager";

describe("utils", () => {
  beforeEach(() => {
    clearCache();
    console.warn = jest.fn();
  });

  it("GlobalStyles sets in global cache properly", async () => {
    GlobalStyles({
      global: { flex: 1 }
    });
    expect(getFromCache("global")).toMatchObject({ flex: 1 });
  });

  it("GlobalStyles sets in namespaced cache properly", async () => {
    GlobalStyles(
      {
        local: { flex: 1 }
      },
      "namespace"
    );
    expect(getFromCache("local", "namespace")).toMatchObject({ flex: 1 });
  });

  it("Development mode only: GlobalUse produces a console.warn when providing a non-existent namespace", async () => {
    GlobalUse("color:@not-a-namespace$blue")();
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      'Non-Existent-Namespace: The following namespace does not exist or has not been imported: "not-a-namespace". You are seeing this warning because you are in development mode. In a production build there will be no warning and these styles will be ignored.'
    );
  });

  it("GlobalStyles sets constants cache properly", async () => {
    GlobalStyles({
      constants: {
        red: "red"
      }
    });
    expect(getFromCache("red", null, null, true)).toBe("red");
  });

  it("GlobalUse gets global cache properly", async () => {
    GlobalStyles({
      global: { flex: 1 }
    });
    expect(GlobalUse(".global")()).toMatchObject({ flex: 1 });
  });

  it("GlobalUse gets constant from global style properly", async () => {
    GlobalStyles({
      constants: {
        blue: "blue"
      }
    });
    expect(GlobalUse("color:$blue")()).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse gets global constant from namespaced style properly", async () => {
    GlobalStyles({
      constants: {
        blue: "blue"
      }
    });
    expect(GlobalUse("color:$blue", "namespace")()).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse gets global constant from style object properly", async () => {
    GlobalStyles({
      constants: {
        blue: "blue"
      }
    });
    expect(GlobalUse({ color: "$blue" }, "namespace")()).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse with computed values", async () => {
    GlobalStyles({
      computed: {
        disable: ([isDisabled]) => ({ color: isDisabled ? "grey" : "blue" })
      }
    });
    expect(GlobalUse("&disable")([true])).toMatchObject({
      color: "grey"
    });
  });

  it("GlobalUse with computed values and constants on style object", async () => {
    GlobalStyles({
      constants: {
        grey: "grey"
      },
      computed: {
        disable: ([isDisabled]) => ({ color: isDisabled ? "$grey" : "blue" })
      }
    });
    expect(GlobalUse("&disable")([true])).toMatchObject({
      color: "grey"
    });
  });

  it("GlobalUse with computed don't find value", async () => {
    GlobalStyles({
      computed: {
        notDisable: ([isDisabled]) => ({
          color: isDisabled ? "grey" : "blue"
        })
      }
    });
    expect(GlobalUse("&disable")([true])).toMatchObject({});
  });

  it("GlobalUse gets constant from style object properly", async () => {
    GlobalStyles({
      constants: {
        blue: "blue"
      },
      local: { color: "$blue" }
    });
    expect(GlobalUse(".local")()).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse gets constant cache properly", async () => {
    GlobalStyles({
      constants: {
        blue: "blue"
      }
    });
    expect(GlobalUse("color:$blue")()).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse gets constant from definition properly", async () => {
    GlobalStyles({
      constants: {
        blue: "blue"
      },
      local: "color:$blue"
    });
    expect(GlobalUse(".local")()).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse gets style from definition properly", async () => {
    GlobalStyles({
      local: "color:blue",
      reused: ".local"
    });
    expect(GlobalUse(".reused")()).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse generates path styles properly", async () => {
    expect(GlobalUse("max:height:300")()).toMatchObject({ maxHeight: 300 });
  });

  it("GlobalUse with falsey value false", async () => {
    expect(GlobalUse("color:red false")()).toMatchObject({
      color: "red"
    });
  });

  it("GlobalUse with falsey value undefined", async () => {
    expect(GlobalUse("color:red undefined")()).toMatchObject({
      color: "red"
    });
  });

  it("GlobalUse with only falsey value undefined", async () => {
    expect(GlobalUse("color:red null")()).toMatchObject({
      color: "red"
    });
  });

  it("GlobalUse with only falsey value", async () => {
    expect(GlobalUse("undefined")()).toMatchObject({});
  });
});
