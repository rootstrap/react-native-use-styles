import { StyleSheet } from "react-native";

const GLOBAL_KEY = "__global";
let globalCache;

export const clearCache = () => {
  globalCache = Object.create(null);
  globalCache[GLOBAL_KEY] = Object.create(null);
};
clearCache();

export const setInCache = (definition, namespace) => {
  // TODO: check whether using Stylesheet is more performant or not
  const nativeCache = StyleSheet.create(definition);

  if (!namespace) {
    Object.assign(globalCache[GLOBAL_KEY], nativeCache);
  } else {
    if (!globalCache[namespace]) {
      globalCache[namespace] = Object.create(null);
    }

    Object.assign(globalCache[namespace], nativeCache);
  }
};

export const getFromCache = (className, namespace) => {
  let style;

  if (!namespace) {
    style = globalCache[GLOBAL_KEY][className];
  } else {
    style =
      (globalCache[namespace] && globalCache[namespace][className]) ||
      globalCache[GLOBAL_KEY][className];
  }

  // get style from stylesheet id
  return StyleSheet.flatten(style);
};
