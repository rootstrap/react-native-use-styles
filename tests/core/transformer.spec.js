import transform, { setSeparator } from "../../src/core/transformer";
import { setInCache, clearCache } from "../../src/core/cache";
import { getFromStorage } from "../../src/core/manager";

describe("utils", () => {
  beforeEach(() => {
    setSeparator(":");
  });

  it("transforms key:value path", () => {
    expect(transform("flex:1")).toMatchObject({ flex: 1 });
  });

  it("transforms key:key:value path", () => {
    expect(transform("flex:direction:row")).toMatchObject({
      flexDirection: "row"
    });
  });

  it("transforms key:key:key:value path", () => {
    expect(transform("border:bottom:color:grey")).toMatchObject({
      borderBottomColor: "grey"
    });
  });

  it("transforms key:value:value path", () => {
    expect(transform("flex:1:2")).toMatchObject({
      flex: "1 2"
    });
  });

  it("transforms key:key:value:value path", () => {
    expect(transform("background:color:green:red")).toMatchObject({
      backgroundColor: "green red"
    });
  });

  it("transforms aliases for keys", () => {
    expect(transform("fx:1")).toMatchObject({
      flex: 1
    });
  });

  it("transforms aliases for value", () => {
    expect(transform("flex:direction:col")).toMatchObject({
      flexDirection: "column"
    });
  });

  it("transforms aliases for key:value", () => {
    expect(transform("fx:dir:col")).toMatchObject({
      flexDirection: "column"
    });
  });

  it("transforms constants for key:$constant", () => {
    clearCache();
    setInCache({
      constants: {
        purple: "purple"
      }
    });
    expect(
      transform("color:$purple", key => getFromStorage(key, null, null, true))
    ).toMatchObject({
      color: "purple"
    });
  });

  it("transforms constants for key:@namespace$constant", () => {
    clearCache();
    setInCache(
      {
        constants: {
          purple: "purple"
        }
      },
      "namespace"
    );
    expect(
      transform("color:@namespace$purple", key =>
        getFromStorage(key, "namespace", null, true)
      )
    ).toMatchObject({
      color: "purple"
    });
  });

  it("sets a separator", () => {
    setSeparator("-");
    expect(transform("flex-1")).toMatchObject({ flex: 1 });
  });
});
