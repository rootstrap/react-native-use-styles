// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style
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
      return { ...stylesAcc, ...style };
    }, {});
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
