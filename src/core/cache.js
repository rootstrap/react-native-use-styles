import { StyleSheet } from 'react-native';
import { GLOBAL_KEY, CONSTANTS_KEY, COMPUTED_KEY } from '../constants';
import { warn } from '../utils';

let globalCache;

export const clearCache = () => {
  globalCache = Object.create(null);
  globalCache[GLOBAL_KEY] = Object.create(null);
};
clearCache();

const processDefinition = definition => {
  const constants = definition.constants;
  const computed = definition.computed;

  warn(
    definition.constant !== undefined,
    `"constant" key found in styles definition. Maybe you intended to use "constants" instead`,
  );

  warn(
    definition.computeds !== undefined,
    `"computeds" key found in styles definition. Maybe you intended to use "computed" instead`,
  );

  definition.constants = null;
  definition.computed = null;

  const styles = StyleSheet.create(definition);

  return { styles, constants, computed };
};

const getValueFromStorageObject = (key, object, isConstant, isComputed) => {
  let obj = object;

  if (isConstant) {
    obj = obj[CONSTANTS_KEY];
  } else if (isComputed) {
    obj = obj[COMPUTED_KEY];
  }

  return obj && obj[key];
};

export const setInCache = (definition, namespace) => {
  const { styles, constants, computed } = processDefinition(definition);
  let cache = globalCache;

  if (namespace) {
    if (!cache[namespace]) cache[namespace] = Object.create(null);
    cache = cache[namespace];
  } else {
    cache = cache[GLOBAL_KEY];
  }

  Object.assign(cache, StyleSheet.create(styles));
  Object.assign(cache, {
    [CONSTANTS_KEY]: constants,
    [COMPUTED_KEY]: computed,
  });
};

export const getFromCache = (
  key,
  namespace,
  definition,
  isConstant,
  isComputed,
) => {
  let value;

  // if it's in definition
  if (definition) {
    value = getValueFromStorageObject(key, definition, isConstant, isComputed);
    if (value) return value;
  }

  // if it's in the namespace
  if (namespace && globalCache[namespace]) {
    value = getValueFromStorageObject(
      key,
      globalCache[namespace],
      isConstant,
      isComputed,
    );
  } else if (
    process.env.NODE_ENV !== 'production' &&
    namespace &&
    !globalCache[namespace]
  ) {
    warn(
      namespace !== undefined && !globalCache[namespace],
      `Namespace "${namespace}" does not exist or has not been imported`,
      'Non-Existent-Namespace',
    );
  }
  // was not in the namespace, try in the global cache
  if (!value) {
    value = getValueFromStorageObject(
      key,
      globalCache[GLOBAL_KEY],
      isConstant,
      isComputed,
    );
  }

  // key not found
  if (!value) {
    warn(
      !value,
      `${isConstant ? 'Constant' : 'Style'} "${key}" does not exist`,
      `Non-Existent-${isConstant ? 'Constant' : 'Style'}`,
    );
    return;
  }

  // if it's a style, get native style from cached id with flatten
  return isConstant || isComputed ? value : StyleSheet.flatten(value);
};
