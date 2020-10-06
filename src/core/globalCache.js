import { StyleSheet } from "react-native";

let globalCache;
const GLOBAL_KEY = "__global";
const CONSTANTS_KEY = "constants";

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

export const getFromCache = (key, namespace, definition, isConstant) => {
  let value;

  // if it's in definition
  if (definition) {
    let def = definition;

    if (isConstant) {
      def = def[CONSTANTS_KEY];
    }

    if (def && def[key]) return def[key];
  }

  // if it's in the namespace
  if (namespace && globalCache[namespace]) {
    let cache = globalCache[namespace];

    if (isConstant) {
      cache = cache[CONSTANTS_KEY];
    }

    value = cache && cache[key];
  }
  else if (process.env.NODE_ENV !== 'production' && namespace && !globalCache[namespace]) {
    // rollup's plugin-replace will replace process.env.NODE_ENV above, resulting in 'production' !== 'production'
    // which will be removed by rollup's dead code elimination process.
    // In other words, this entire if block only exists in testing and development mode
    console.warn(`Non-Existent-Namespace: The following namespace does not exist or has not been imported: "${namespace}". You are seeing this warning because you are in development mode. In a production build there will be no warning and these styles will be ignored.`) 
  }

  // was not in the namespace, try in the global cache
  if (!value) {
    let cache = globalCache[GLOBAL_KEY];

    if (isConstant) {
      cache = cache[CONSTANTS_KEY];
    }

    value = cache && cache[key];
  }

  // if it's a style, get native style from cached id with flatten
  return isConstant ? value : StyleSheet.flatten(value);
};
