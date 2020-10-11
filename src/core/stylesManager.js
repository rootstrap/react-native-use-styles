// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style
import { useRef } from "react";
import transform from "./pathTransform";
import { getFromCache, setInCache } from "./globalCache";
import {
  isFalseyString,
  isClassName,
  isComputed,
  hasComputed,
  getKey,
  isNamespace,
  getKeyFromNamespace,
  getNamespace,
  flattenStyles,
  getPathFromLiteralTag
} from "./utils";

const recomputeMutation = (cache, dependencies) => {
  for (let [key, { compute }] of Object.entries(cache)) {
    if (hasComputed(key)) {
      cache[key] = { 
        compute, 
        style: compute(dependencies) 
      }
    }
  }
};

const computePath = (path, namespace, dependencies) => {
  let fn = getFromStorage(path, namespace, null, false, true);
  if (!fn) {
    console.warn(`Computed ${path} not found in cache`);
    return;
  }

  const computedStyle = fn(dependencies);
  fn = GlobalUse(computedStyle, namespace);
  return fn(dependencies);
};

export const getFromStorage = (
  pKey,
  namespace,
  definition,
  isConstant = false,
  isComputed = false
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

export const GlobalUse = (path, namespace) => {
  // TODO: this is retrieving all the styles even if we are recomputing
  // maybe, if we are recomputing, we should find a way to retreive only the computeds
  return dependencies => {
    let styles = path;

    if (typeof styles !== "object") {
      styles = path
        .trim()
        .split(" ")
        .reduce((stylesAcc, p) => {
          let style;

          if (isFalseyString(p)) {
            return stylesAcc;
          }

          if (isClassName(p)) {
            style = getFromStorage(p, namespace);
          } else if (isComputed(p)) {
            style = computePath(p, namespace, dependencies);
          } else {
            style = transform(p, key =>
              getFromStorage(key, namespace, null, true)
            );
          }

          return { ...stylesAcc, ...style };
        }, {});
    }

    return styles;
  };
};

export const useGlobalStyles = (nameSpace, dependencies = []) => {
  // create local cache for returned styles, so we can avoid re renders, transformations and computations
  const lastDependencies = useRef(dependencies);
  const localCache = useRef(Object.create(null));
  const cache = localCache.current;

  // manual shallow compare; not using useEffect because it would need to render twice
  // given the necessity of explicitly telling react to queue an update with set[State]
  // after recomputing styles
  if (lastDependencies.current.some((dep, index) => dep !== dependencies[index])) {
    recomputeMutation(cache, dependencies)
    lastDependencies.current = dependencies;
  }

  return (strings, ...expressions) => {
    const path = getPathFromLiteralTag(strings, expressions);

    if (cache[path]) {
      return cache[path].style;
    }

    const compute = GlobalUse(path, nameSpace);
    const style = compute(dependencies);
    Object.assign(cache, { [path]: { style, compute } });
    return style;
  };
};

export const GlobalStyles = (definition, namespace) => {
  for (let [key, value] of Object.entries(definition)) {
    // transform if it's not a style object, the constants object or the computeds object
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
            style = getFromStorage(path, namespace, definition);
          } else {
            style = transform(path, key =>
              getFromStorage(key, namespace, definition, true)
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

  const useStyles = dependencies =>
    useGlobalStyles(definitionNamespace, dependencies);
  useStyles.namespace = definitionNamespace;
  return useStyles;
};
