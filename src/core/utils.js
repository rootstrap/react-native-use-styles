export const styleSheetNoop = {
  flatten: (styles) => styles,
  create: (styles) => styles,
};

export const isFalseyString = (value) => {
  try {
    return value === "undefined" || JSON.parse(value);
  } catch (_) {
    return false;
  }
};

export const isClassName = (path) => path.startsWith(".");

export const getClassName = (path) => path.substring(1);

export const flattenStyles = (styles) => {
  return styles.reduce(
    (flattenStyles, style) => Object.assign(flattenStyles, style),
    Object.create(null)
  );
};
