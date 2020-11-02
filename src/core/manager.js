import transform, { hasPath } from './transformer';
import { getFromCache, setInCache } from './cache';
import {
  hasConstant,
  hasClassName,
  hasComputed,
  getKey,
  isNamespace,
  getKeyFromNamespace,
  getNamespace,
  warn,
} from '../utils';
import { CONSTANTS_KEY, COMPUTED_KEY } from '../constants';

export const getFromStorage = (
  pKey,
  namespace,
  definition,
  isConstant = false,
  isComputed = false,
) => {
  let space = namespace;
  let key = pKey;

  if (isNamespace(key)) {
    space = getNamespace(key);
    key = getKeyFromNamespace(key);
  }
  key = getKey(key);

  return getFromCache(key, space, definition, isConstant, isComputed);
};

const constantsMutation = (styles, namespace, definition) => {
  for (let [key, value] of Object.entries(styles)) {
    if (typeof value === 'string' && hasConstant(value)) {
      styles[key] = getFromStorage(value, namespace, definition, true);
    }
  }
};

const computePath = (path, namespace, dependencies) => {
  let fn = getFromStorage(path, namespace, null, false, true);
  if (!fn) {
    warn(
      !fn,
      `Computed style "${path}" not found in cache`,
      'Non-Existent-Computed',
    );

    return;
  }

  const computedStyle = fn(dependencies);
  fn = GlobalUse(computedStyle, namespace);
  return fn(dependencies);
};

const processStyles = (rawStyles, namespace, dependencies, definition) => {
  // if there's a definition, it's because we come from a style definition
  // meaning GlobalStyles is being used
  return rawStyles
    .trim()
    .split(' ')
    .reduce((styles, rawStyle) => {
      let style;

      if (hasClassName(rawStyle)) {
        style = getFromStorage(rawStyle, namespace, definition);
      } else if (!definition && hasComputed(rawStyle)) {
        style = computePath(rawStyle, namespace, dependencies);
      } else if (hasPath(rawStyle)) {
        style = transform(rawStyle, key =>
          getFromStorage(key, namespace, definition, true),
        );
      } else {
        return styles;
      }

      return Object.assign(styles, style);
    }, Object.create(null));
};

export const GlobalUse = (rawStyles, namespace) => {
  // TODO: this is retrieving all the styles even if we are recomputing
  // maybe, if we are recomputing, we should find a way to retreive only the computeds
  return dependencies => {
    let styles = rawStyles;

    if (typeof styles === 'string') {
      styles = processStyles(styles, namespace, dependencies);
    } else if (typeof styles === 'object') {
      constantsMutation(styles, namespace);
    }

    return styles;
  };
};

// TODO: GlobalStyles({ [style]: 124235 }); receives a Stylesheet identifier (?)
export const GlobalStyles = (definition, namespace) => {
  for (let [key, rawStyles] of Object.entries(definition)) {
    let styles = rawStyles;

    warn(
      typeof styles === 'function',
      `Style "${key}" is not valid. Computed styles are placed inside the computed section`,
      'Invalid-Style-Type',
    );

    if (typeof styles === 'string') {
      definition[key] = processStyles(styles, namespace, null, definition);
    } else if (
      typeof styles === 'object' &&
      key !== CONSTANTS_KEY &&
      key !== COMPUTED_KEY
    ) {
      constantsMutation(styles, namespace, definition);
    }
  }

  setInCache(definition, namespace);
};
