import { setSeparator } from "./lib/pathTransform";
import { setStyleSheet } from "./lib/stylesPath";
export const init = (options) => {
  if (options.separator) {
    setSeparator(options.separator);
  }
  if (options.styleSheet) {
    setStyleSheet(options.styleSheet);
  }
};

export { default as useStyles } from "./lib/useStyles";
export { namespace, globalDefine, globalUse } from "./lib/stylesPath";
