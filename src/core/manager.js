// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style
import transform from "./transformer";
import { getFromCache, setInCache } from "./cache";
import {
  isFalseyString,
  isConstant,
  isClassName,
  isComputed,
  getKey,
  isNamespace,
  getKeyFromNamespace,
  getNamespace,
  flattenStyles
} from "../utils";

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

const constantsMutation = (styles, namespace, definition) => {
  for (let [key, value] of Object.entries(styles)) {
    if (typeof value === "string" && isConstant(value)) {
      styles[key] = getFromStorage(value, namespace, definition, true);
    }
  }
};

const computePath = (path, namespace, dependencies) => {
  let fn = getFromStorage(path, namespace, null, false, true);
  if (!fn) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Non-Existent-Computed: Computed ${path} not found in cache.`
      );
    }
    return;
  }

  const computedStyle = fn(dependencies);
  fn = GlobalUse(computedStyle, namespace);
  return fn(dependencies);
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
    } else {
      constantsMutation(styles, namespace);
    }

    return styles;
  };
};

export const GlobalStyles = (definition, namespace) => {
  for (let [key, value] of Object.entries(definition)) {
    // transform if it's not a style object, the constants object or the computeds object
    let styles = value;
    if (typeof styles !== "object") {
      styles = styles
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
    } else {
      constantsMutation(styles, namespace, definition);
    }
  }

  setInCache(definition, namespace);
};
