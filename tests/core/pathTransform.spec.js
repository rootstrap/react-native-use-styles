import transform from "../../src/core/pathTransform";

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
});
