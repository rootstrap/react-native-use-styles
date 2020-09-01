export const styleSheetNoop = {
  flatten: (styles) => styles,
  create: (styles) => styles,
};

export const checkFalsey = (value) =>
  value === "undefined" || JSON.parse(value);

export const isClassName = (path) => path.startsWith(".");

export const getClassName = (path) => path.substring(1);

export const flattenStyles = (styles, className) => {
  let flatten = styles.reduce(
    (flattenStyles, style) => Object.assign(flattenStyles, style),
    Object.create(null)
  );

  return {
    [className]: flatten,
  };
};
