const CLASS_PREFIX = ".";
const NAMESPACE_PREFIX = "@";

export const isClassName = path => path.startsWith(CLASS_PREFIX);

export const getClassName = path =>
  path.substring(path.indexOf(CLASS_PREFIX) + 1);

export const isNamespaceClass = path => path.startsWith(NAMESPACE_PREFIX);

export const getNamespace = path =>
  path.substring(1, path.indexOf(CLASS_PREFIX));

export const StyleSheetNoop = {
  flatten: styles => styles,
  create: styles => styles
};

export const isFalseyString = value => {
  try {
    return value === "undefined" || !JSON.parse(value);
  } catch (_) {
    return false;
  }
};

export const flattenStyles = styles =>
  styles.reduce(
    (flattenStyles, style) => Object.assign(flattenStyles, style),
    Object.create(null)
  );

export const getPathFromLiteralTag = (strings, expressions) =>
  strings.reduce(
    (result, currentString, i) =>
      `${result}${currentString}${expressions[i] ? expressions[i] : ""}`,
    ""
  );
