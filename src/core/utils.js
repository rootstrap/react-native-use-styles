export const StyleSheetNoop = {
  flatten: (styles) => styles,
  create: (styles) => styles,
};

export const isFalseyString = (value) => {
  try {
    return value === 'undefined' || JSON.parse(value);
  } catch (_) {
    return false;
  }
};

export const isClassName = (path) => path.startsWith('.');

export const getClassName = (path) => path.substring(1);

export const flattenStyles = (styles) =>
  styles.reduce(
    (flattenStyles, style) => Object.assign(flattenStyles, style),
    Object.create(null)
  );

export const getPathFromLiteralTag = (strings, expressions) =>
  strings.reduce(
    (result, currentString, i) =>
      `${result}${currentString}${expressions[i] ? expressions[i] : ''}`,
    ''
  );
