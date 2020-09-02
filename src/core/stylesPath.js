// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style
// TODO: check if there are collisions between keys and values as
// fl:dir:row:1 could be 'flexDirection: row 1' and 'flexDirectionRow: 1' (?)
// TODO: validate props and values (?)
// TODO: add errors; inexistent-namespace when get cache, undefined-path or not key-value present, invalid-key, undefiend-classname
import { StyleSheet } from "react-native";
import {
  isFalseyString,
  isClassName,
  getClassName,
  flattenStyles,
} from "./utils";
import transform from "./pathTransform";

const globalCache = Object.create(null);

const setInCache = (definition, namespace) => {
  // TODO: check whether using Stylesheet is more performant or not
  const nativeCache = StyleSheet.create(definition);

  if (!namespace) {
    Object.assign(globalCache, nativeCache);
  } else {
    if (!globalCache[namespace]) {
      globalCache[namespace] = Object.create(null);
    }

    Object.assign(globalCache[namespace], nativeCache);
  }
};

const getFromCache = (className, namespace) => {
  let style;

  if (!namespace) {
    style = globalCache[className];
  } else {
    style =
      (globalCache[namespace] && globalCache[namespace][className]) ||
      globalCache[className];
  }

  // get style from stylesheet id
  return StyleSheet.flatten(style);
};

export const globalDefine = (definition, namespace) => {
  for (let [key, value] of Object.entries(definition)) {
    if (typeof value !== 'object') {
      const styles = value
        .trim()
        .split(' ')
        .reduce((stylesAcc, path) => {
          let style;

          if (isClassName(path)) {
            const className = getClassName(path);
            style = definition[className] || getFromCache(className, namespace);
          } else {
            style = transform(path);
          }

          stylesAcc.push(style);
          return stylesAcc;
        }, []);

      definition[key] = flattenStyles(styles);
    }
  }

  setInCache(definition, namespace);
};

export const define = (definition, namespace) => {
  let definitionNamespace = namespace;

  if (!definitionNamespace) {
    namespace = Symbol();
  }

  globalDefine(definition, definitionNamespace);

  return definitionNamespace;
};

export const globalUse = (path, namespace) => {
  const styles = path
    .trim()
    .split(' ')
    .reduce((stylesAcc, p) => {
      if (isFalseyString(p)) {
        return stylesAcc;
      }

      if (isClassName(p)) {
        stylesAcc.push(getFromCache(getClassName(p), namespace));
      } else {
        stylesAcc.push(transform(p));
      }

      return stylesAcc;
    }, []);

  return styles;
};
