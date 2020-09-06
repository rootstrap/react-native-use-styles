const CLASS_PREFIX = ".";
const NAMESPACE_PREFIX = "@";
const CONSTANTS_PREFIX = "$";
const NAMESPACE_REGEX = new RegExp(`@[^${CLASS_PREFIX}${CONSTANTS_PREFIX}]+`);

export const isNamespace = path => path.startsWith(NAMESPACE_PREFIX);

export const getKeyFromNamespace = path => path.replace(NAMESPACE_REGEX, "");

export const getKey = path => path.substring(1);

export const getNamespace = path => path.match(NAMESPACE_REGEX)[0].substring(1);

export const isClassName = path =>
  getKeyFromNamespace(path).startsWith(CLASS_PREFIX);

export const isConstant = path =>
  getKeyFromNamespace(path).startsWith(CONSTANTS_PREFIX);

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
