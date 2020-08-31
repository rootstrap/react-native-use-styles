// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style
// TODO: check if there are collisions like fl:dir:row:1 could be 'flexDirection: row' and 'flexDirectionRow: 1' (?)
// TODO: validate props and values (?)
// TODO: View, Text, Touchable, etc wrappers; so you use className prop instead of styles={p(...)}
// add "#namespace .class1 .class2" or { View, Text } = nameSpacedComponent('namespace');
// maybe using
// TODO: Conditional classes as with cn(...)
// TODO: add errors; inexistent-namespace when get cache, undefined-path or not key-value present, invalid-key, undefiend-classname
import transform from "./pathTransform";

const classesCache = Object.create(null);

const styleSheetNoop = {
  flatten: (styles) => styles,
  create: (styles) => styles
};

const isClassName = (path) => path.startsWith('.');
const getClassName = (path) => path.substring(1);
const flattenStyles = (styles, className) => {
  let flatten = styles.reduce((flattenStyles, style) => 
    Object.assign(flattenStyles, style), Object.create(null));
  
  return {
    [className]: flatten
  };
};
  
const getFromCache = (className, nameSpace) => {
  if (!nameSpace) {
    return classesCache[className];
  }

  return (
    (classesCache[nameSpace] && classesCache[nameSpace][className]) ||
    classesCache[className]
  );
};

const setInCache = (styles, nameSpace) => {
  if (!nameSpace) {
    Object.assign(classesCache, styles);
  } else {
    if (!classesCache[nameSpace]) {
      classesCache[nameSpace] = Object.create(null);
    }

    Object.assign(classesCache[nameSpace], styles);
  }
};

export const globalDefine = (pathOrObject, className, nameSpace) => {
  let styles = [pathOrObject];
  
  // if it's a path, we need to transform it
  if (typeof pathOrObject !== 'object') {
    styles = pathOrObject.split(" ").map((p) => {
      if (isClassName(p)) {
        const style = getFromCache(getClassName(p), nameSpace);

        // get style object from from styleSheet ID
        return styleSheetNoop.flatten(style, nameSpace);
      }

      return transform(p);
    });
  }

  styles = flattenStyles(styles, className);
  setInCache(styleSheetNoop.create(styles), nameSpace);
};

export const globalUse = (path, nameSpace) => {
  const styles = path.split(" ").map((p) => {
    if (isClassName(p)) {
      return getFromCache(getClassName(p), nameSpace);
    }

    return transform(p);
  });

  return styles;
};

export const namespace = (nameSpace) => ({
  define: (path, className) => globalDefine(path, className, nameSpace),
  use: (path) => globalUse(path, nameSpace),
});

