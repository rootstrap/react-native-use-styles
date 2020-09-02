// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style
// TODO: check if there are collisions between keys and values as
// fl:dir:row:1 could be 'flexDirection: row 1' and 'flexDirectionRow: 1' (?)
// TODO: validate props and values (?)
// TODO: add errors; inexistent-namespace when get cache, undefined-path or not key-value present, invalid-key, undefiend-classname
// TODO: when defining with other namespace's styles: p('#namespace.class'), we need to becarfeul with definition order
// maybe we can defer the definition if it's undefined until usage
import {
  isFalseyString,
  isClassName,
  getClassName,
  isNamespaceClass,
  getNamespace,
  flattenStyles,
} from "./utils";
import transform from "./pathTransform";
import useGlobalStyles from "./useGlobalStyles";
import { getFromCache, setInCache } from "./globalCache";

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
