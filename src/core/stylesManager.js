// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style
// TODO: check if there are collisions between keys and values as
// fl:dir:row:1 could be 'flexDirection: row 1' and 'flexDirectionRow: 1' (?)
// TODO: add errors; inexistent-namespace when get cache, undefined-path or not key-value present, invalid-key, undefiend-classname
import { useMemo, useCallback } from "react";
import transform from "./pathTransform";
import { getFromCache, setInCache } from "./globalCache";
import {
  isFalseyString,
  isClassName,
  getKey,
  isNamespace,
  getKeyFromNamespace,
  getNamespace,
  flattenStyles,
  getPathFromLiteralTag
} from "./utils";

export const getFromDefinitionOrCache = (
  pKey,
  namespace,
  definition,
  isConstant = false
) => {
  let space = namespace;
  let key = pKey;

  if (isNamespace(key)) {
    space = getNamespace(key);
    key = getKeyFromNamespace(key);
  }
  key = getKey(key);

  return getFromCache(key, space, definition, isConstant);
};

export const GlobalUse = (path, namespace) => {
  const styles = path
    .trim()
    .split(" ")
    .reduce((stylesAcc, p) => {
      let style;

      if (isFalseyString(p)) {
        return stylesAcc;
      }

      if (isClassName(p)) {
        style = getFromDefinitionOrCache(p, namespace);
      } else {
        style = transform(p, key =>
          getFromDefinitionOrCache(key, namespace, null, true)
        );
      }

      stylesAcc.push(style);
      return stylesAcc;
    }, []);

  return styles;
};

export const useGlobalStyles = nameSpace => {
  // create local cache for returned arrays, so we can avoid re-renders and re-transformations
  const localCache = useMemo(() => Object.create(null), []);

  return useCallback((strings, ...expressions) => {
    const path = getPathFromLiteralTag(strings, expressions);

    if (localCache[path]) {
      return localCache[path];
    }

    const styles = GlobalUse(path, nameSpace);
    Object.assign(localCache, { [path]: styles });

    return styles;
  }, []);
};

export const GlobalStyles = (definition, namespace) => {
  for (let [key, value] of Object.entries(definition)) {
    // only transform if it's not a style object
    if (typeof value !== "object") {
      const styles = value
        .trim()
        .split(" ")
        .reduce((stylesAcc, path) => {
          let style;

          if (isFalseyString(path)) {
            return stylesAcc;
          }

          if (isClassName(path)) {
            style = getFromDefinitionOrCache(path, namespace, definition);
          } else {
            style = transform(path, key =>
              getFromDefinitionOrCache(key, namespace, definition, true)
            );
          }

          stylesAcc.push(style);
          return stylesAcc;
        }, []);

      definition[key] = flattenStyles(styles);
    }
  }

  setInCache(definition, namespace);
};

export const Styles = (definition, namespace) => {
  let definitionNamespace = namespace;

  if (!definitionNamespace) {
    definitionNamespace = Symbol();
  }

  GlobalStyles(definition, definitionNamespace);

  const useStyles = () => useGlobalStyles(definitionNamespace);
  useStyles.namespace = definitionNamespace;

  return useStyles;
};
