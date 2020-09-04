import transform from "../../src/core/pathTransform";
import { setInCache, clearCache } from "../../src/core/globalCache";
import { getConstant } from "../../src/core/stylesManager";

describe("utils", () => {
  it("transforms key:value path", async () => {
    expect(transform("flex:1")).toMatchObject({ flex: 1 });
  });

  it("transforms key:key:value path", async () => {
    expect(transform("flex:direction:row")).toMatchObject({
      flexDirection: "row"
    });
  });

  it("transforms key:key:key:value path", async () => {
    expect(transform("border:bottom:color:grey")).toMatchObject({
      borderBottomColor: "grey"
    });
  });

  it("transforms key:value:value path", async () => {
    expect(transform("flex:1:2")).toMatchObject({
      flex: "1 2"
    });
  });

  it("transforms key:key:value:value path", async () => {
    expect(transform("background:color:green:red")).toMatchObject({
      backgroundColor: "green red"
    });
  });

  it("transforms aliases for keys", async () => {
    expect(transform("fx:1")).toMatchObject({
      flex: 1
    });
  });

  it("transforms aliases for value", async () => {
    expect(transform("flex:direction:col")).toMatchObject({
      flexDirection: "column"
    });
  });

  it("transforms aliases for key:value", async () => {
    expect(transform("fx:dir:col")).toMatchObject({
      flexDirection: "column"
    });
  });

  it("transforms constants for key:$constant", async () => {
    clearCache();
    setInCache({
      constants: {
        purple: "purple"
      }
    });
    expect(transform("color:$purple", key => getConstant(key))).toMatchObject({
      color: "purple"
    });
  });

  it("transforms constants for key:@namespace$constant", async () => {
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
      transform("color:@namespace$purple", key => getConstant(key))
    ).toMatchObject({
      color: "purple"
    });
  });
});
