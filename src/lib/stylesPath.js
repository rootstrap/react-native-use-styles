// TODO: p({ flexDirection: 'row' }, 'fl-row') to send an object and cache it with Stylesheet.create
// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style
// TODO: check if there are collisions like fl:dir:row:1 could be 'flexDirection: row' and 'flexDirectionRow: 1' (?)
// TODO: validate props and values (?)
// TODO: View, Text, Touchable, etc wrappers; so you use className prop instead of styles={p(...)}
// add "#namespace .class1 .class2" or { View, Text } = nameSpacedComponent('namespace');
// maybe using
// TODO: Conditional classes as with cn(...)
// TODO: add errors; inexistent-namespace when get cache, undefined-path or not key-value present, invalid-key, undefiend-classname
import { StyleSheet } from "react-native";
import transform from "./pathTransform";

const classesCache = Object.create(null);

const getFromCache = (className, nameSpace) => {
  if (!nameSpace) {
    return classesCache[className];
  }

  return (
    (classesCache[nameSpace] && classesCache[nameSpace][className]) ||
    classesCache[className]
  );
};

const setInCache = (className, styles, nameSpace) => {
  if (!nameSpace) {
    classesCache[className] = styles;
  } else {
    if (!classesCache[nameSpace]) {
      classesCache[nameSpace] = Object.create(null);
    }

    classesCache[nameSpace][className] = styles;
  }
};

export const define = (path, className, nameSpace) => {
  let styles = path.split(" ").map((p) => {
    if (isClassName(p)) {
      // TODO: test without flatten
      return StyleSheet.flatten(getFromCache(p, nameSpace));
    }

    return transform(p);
  });

  setInCache(className, StyleSheet.create(styles), nameSpace);
};

export const use = (path, nameSpace) => {
  const styles = path.split(" ").map((p) => {
    if (isClassName(p)) {
      return getFromCache(p, nameSpace);
    }

    return transform(p);
  });

  return styles;
};
