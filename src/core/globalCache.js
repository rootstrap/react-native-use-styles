import { StyleSheet } from "react-native";

let globalCache;
const GLOBAL_KEY = "__global";
export const CONSTANTS_KEY = "constants";

export const clearCache = () => {
  globalCache = Object.create(null);
  globalCache[GLOBAL_KEY] = Object.create(null);
};
clearCache();

const processDefinition = definition => {
  const constants = definition.constants;
  if (constants) {
    definition.constants = null;
  }
  const styles = StyleSheet.create(definition);

  return { styles, constants };
};

export const setInCache = (definition, namespace) => {
  const { styles, constants } = processDefinition(definition);
  let cache = globalCache;

  if (namespace) {
    if (!cache[namespace]) cache[namespace] = Object.create(null);
    cache = cache[namespace];
  } else {
    cache = cache[GLOBAL_KEY];
  }

  // TODO: check whether using Stylesheet is more performant or not
  Object.assign(cache, StyleSheet.create(styles));
  Object.assign(cache, { constants });
};

export const getFromCache = (key, namespace, isConstant) => {
  let cache = globalCache;

  if (namespace && cache[namespace]) {
    cache = cache[namespace];
  } else {
    cache = globalCache[GLOBAL_KEY];
  }
  if (isConstant) {
    cache = cache[CONSTANTS_KEY];
  }

  let value = cache[key];

  // if it's a style, get native style from cached id with flatten
  return isConstant ? value : StyleSheet.flatten(value);
};
