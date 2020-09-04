import { clearCache, getFromCache } from "../../src/core/globalCache";
import { GlobalStyles, Styles, GlobalUse } from "../../src/core/stylesManager";

describe("utils", () => {
  beforeEach(() => {
    clearCache();
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

  it("Styles sets namespace and cache properly", async () => {
    const hook = Styles({
      local: { flex: 1 }
    });
    expect(getFromCache("local", hook.namespace)).toMatchObject({ flex: 1 });
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

  it("GlobalUse gets global cache properly", async () => {
    GlobalStyles({
      global: { flex: 1 }
    });
    expect(GlobalUse(".global")[0]).toMatchObject({ flex: 1 });
  });

  it("GlobalUse gets local cache properly", async () => {
    Styles(
      {
        local: { flex: 1 }
      },
      "namespace"
    );
    expect(GlobalUse(".local", "namespace")[0]).toMatchObject({ flex: 1 });
  });

  it("GlobalUse generates path styles properly", async () => {
    expect(GlobalUse("max:height:300")[0]).toMatchObject({ maxHeight: 300 });
  });
});
