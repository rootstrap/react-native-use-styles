import stylesDictionary from '../dictionaries/styles';
import aliasesDictionary from '../dictionaries/aliases';
import { hasConstant, warn } from '../utils';
import { DEFAULT_SEPARATOR } from '../constants';

export let separator = DEFAULT_SEPARATOR;

export const hasPath = style => style.indexOf(separator) !== -1;

const getValueFromParts = (parts, getConstant) => {
  // value is always located in the last part
  let value = parts[parts.length - 1];

  if (hasConstant(value)) {
    value = getConstant(value);
  } else {
    value = aliasesDictionary[value] || value;
  }

  return parseFloat(value) || value;
};

const getKeyFromParts = parts => {
  let current = stylesDictionary;

  for (let x = 0; x < parts.length - 1; x += 1) {
    let part = parts[x];
    part = aliasesDictionary[part] || part;
    current = current[part];

    if (current === undefined) {
      warn(
        current === undefined,
        `"${part}" is not a valid key for styles`,
        'Invalid-Style-Key',
      );
      // return to be executed when current is undefined
      return;
    }
  }

  return current.__propName;
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

export const setSeparator = newSeparator => {
  separator = newSeparator;
};
