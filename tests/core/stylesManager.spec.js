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

  it("GlobalStyles sets constants cache properly", async () => {
    GlobalStyles({
      constants: {
        red: "red"
      }
    });
    expect(getFromCache("red", null, null, true)).toBe("red");
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

  it("GlobalUse gets style from definition properly", async () => {
    Styles(
      {
        local: "color:blue",
        reused: ".local"
      },
      "namespace"
    );
    expect(GlobalUse(".reused", "namespace")[0]).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse gets constant from definition properly", async () => {
    Styles(
      {
        constants: {
          blue: "blue"
        },
        local: "color:$blue"
      },
      "namespace"
    );
    expect(GlobalUse(".local", "namespace")[0]).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse gets constant from global style properly", async () => {
    GlobalStyles({
      constants: {
        blue: "blue"
      }
    });
    expect(GlobalUse("color:$blue")[0]).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse gets global constant from namespaced style properly", async () => {
    GlobalStyles({
      constants: {
        blue: "blue"
      }
    });
    expect(GlobalUse("color:$blue", "namespace")[0]).toMatchObject({
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
    expect(GlobalUse(".namespaced", "namespace")[0]).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse gets constant cache properly", async () => {
    Styles(
      {
        constants: {
          blue: "blue"
        }
      },
      "namespace"
    );
    expect(GlobalUse("color:$blue", "namespace")[0]).toMatchObject({
      color: "blue"
    });
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
    expect(GlobalUse("color:@namespace$blue", "namespace")[0]).toMatchObject({
      color: "blue"
    });
  });

  it("GlobalUse with falsey value false", async () => {
    expect(GlobalUse("color:red false")[0]).toMatchObject({
      color: "red"
    });
  });

  it("GlobalUse with falsey value undefined", async () => {
    expect(GlobalUse("color:red undefined")[0]).toMatchObject({
      color: "red"
    });
  });

  it("GlobalUse with only falsey value undefined", async () => {
    expect(GlobalUse("color:red null")[0]).toMatchObject({
      color: "red"
    });
  });

  it("GlobalUse with only falsey value", async () => {
    expect(GlobalUse("undefined")).toHaveLength(0);
  });
});
