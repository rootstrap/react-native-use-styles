import "../styles/index.scss";
import { p } from "./stylesPath";

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}

console.log(JSON.stringify(p("fx-dir-row-1")));
