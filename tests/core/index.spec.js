import { clearCache, getFromCache } from "../../src/core/cache";
import { GlobalUse, GlobalStyles } from "../../src/core/manager";
import { Styles } from "../../src/core";

describe("utils", () => {
  beforeEach(() => {
    clearCache();
    console.warn = jest.fn();
  });

  it("Styles sets cache properly", async () => {
    Styles(
      {
        local: { flex: 1 }
      },
      "namespace"
    );
    expect(getFromCache("local", "namespace")).toMatchObject({ flex: 1 });
  });

  it("Styles sets namespace and cache properly", async () => {
    const hook = Styles({
      local: { flex: 1 }
    });
    expect(getFromCache("local", hook.namespace)).toMatchObject({ flex: 1 });
  });

  it("Styles sets constants cache properly", async () => {
    Styles(
      {
        constants: {
          red: "red"
        }
      },
      "namespace"
    );
    expect(getFromCache("red", "namespace", null, true)).toBe("red");
  });

  it("GlobalUse gets namsepaced cache properly", async () => {
    Styles(
      {
        local: { flex: 1 }
      },
      "namespace"
    );
    expect(GlobalUse(".local", "namespace")()).toMatchObject({ flex: 1 });
  });

  it("GlobalUse gets namespaced constant cache properly", async () => {
    Styles(
      {
        constants: {
          blue: "blue"
        }
      },
      "namespace"
    );
    expect(GlobalUse("color:@namespace$blue")()).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse with computed values in namespace", async () => {
    Styles(
      {
        computed: {
          disable: ([isDisabled]) => ({ color: isDisabled ? "grey" : "blue" })
        }
      },
      "namespace"
    );
    expect(GlobalUse("@namespace&disable")([false])).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse gets global constant from namespaced style properly with definition", async () => {
    GlobalStyles({
      constants: {
        blue: "blue"
      }
    });
    Styles(
      {
        reused: "color:$blue",
        namespaced: ".reused"
      },
      "namespace"
    );
    expect(GlobalUse(".namespaced", "namespace")()).toMatchObject({
      color: "blue"
    });
  });
});
