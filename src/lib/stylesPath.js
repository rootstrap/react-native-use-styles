// TODO: p({ flexDirection: 'row' }, 'fl-row') to send an object and cache it with Stylesheet.create
// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style
// TODO: check if there are collisions like fl:dir:row:1 could be 'flexDirection: row' and 'flexDirectionRow: 1' (?)
// TODO: validate props and values (?)
// TODO: View, Text, Touchable, etc wrappers; so you use className prop instead of styles={p(...)}
// TODO: Conditional classes as with cn(...)
import { StyleSheet } from "react-native";
import transform from "./pathTransform";

const stylesCache = Object.create(null);

const getNameSpacedCache = (nameSpace) => {
  let cache = stylesCache;

  if (nameSpace) {
    if (!cache[nameSpace]) {
      cache[nameSpace] = Object.create(null);
    }
    cache = cache[nameSpace];
  };

  return cache;
};

export const define = (path, className, nameSpace) => {
  let cache = getNameSpacedCache(nameSpace);

  const styles = path.split(' ').map((p) => {
    if (isClassName(p)) {
      return cache[p];
    }

    return StyleSheet.Create(transform(p));
  });

  cache[className] = styles;
  return styles;
};

export const use = (path, nameSpace) => {
  let cache = getNameSpacedCache(nameSpace);

  const styles = path.split(' ').map((p) => {
    if (isClassName(p)) {
      return cache[p];
    }

    return transform(p);
  });

  return styles;
};
