import getAlias from '../aliases';
import { hasConstant, capitalize } from '../utils';
import { DEFAULT_SEPARATOR } from '../constants';

export let separator = DEFAULT_SEPARATOR;

export const hasPath = (style) => style.indexOf(separator) !== -1;

const getValueFromParts = (parts, getConstant) => {
  // value is always located in the last part
  let value = parts[parts.length - 1];

  if (hasConstant(value)) {
    value = getConstant(value);
  } else {
    value = getAlias(value);
  }

  return parseFloat(value) || value;
};

const getKeyFromParts = (parts) => {
  let current = getAlias(parts[0]);

  for (let x = 1; x < parts.length - 1; x += 1) {
    current += capitalize(getAlias(parts[x]));
  }

  return current;
};

// PRECONDITION: at least one key-value pair exists in the path
export default (path, getConstant) => {
  const parts = path.split(separator);
  const key = getKeyFromParts(parts);
  const value = getValueFromParts(parts, getConstant);

  return Object.assign(Object.create(null), {
    [key]: value,
  });
};

export const setSeparator = (newSeparator) => {
  separator = newSeparator;
};
