// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style
// TODO: check if there are collisions between keys and values as
// fl:dir:row:1 could be 'flexDirection: row 1' and 'flexDirectionRow: 1' (?)
// TODO: validate props and values (?)
// TODO: add errors; inexistent-namespace when get cache, undefined-path or not key-value present, invalid-key, undefiend-classname
// TODO: when defining with other namespace's styles: p('#namespace.class'), we need to becarfeul with definition order
// maybe we can defer the definition if it's undefined until usage
import { useMemo, useCallback } from "react";
import transform from "./pathTransform";
import { getFromCache, setInCache } from "./globalCache";
import {
  isFalseyString,
  isClassName,
  getClassName,
  isNamespaceClass,
  getNamespace,
  flattenStyles,
  getPathFromLiteralTag
} from "./utils";

export const GlobalUse = (path, namespace) => {
  const styles = path
    .trim()
    .split(" ")
    .reduce((stylesAcc, p) => {
      if (isFalseyString(p)) {
        return stylesAcc;
      }

      let style;
      if (isClassName(p)) {
        style = getFromCache(getClassName(p), namespace);
      } else if (isNamespaceClass(p)) {
        style = getFromCache(getClassName(p), getNamespace(p));
      } else {
        style = transform(p);
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
    if (typeof value !== "object") {
      const styles = value
        .trim()
        .split(" ")
        .reduce((stylesAcc, path) => {
          let style;
          if (isClassName(path)) {
            const className = getClassName(path);
            style = definition[className] || getFromCache(className, namespace);
          } else if (isNamespaceClass(path)) {
            style = getFromCache(getClassName(path), getNamespace(path));
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
