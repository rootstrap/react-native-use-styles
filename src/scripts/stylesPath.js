// TODO: API; p('fl-0.5-dir-row', 'split-container') then you can use p('.split-container')
// or if you use p('fl-0.5-dir-row') again, it will retreive the cached version
// the cached version should retreive the native cached version of Stylesheet.create
// something to take into consideration is that if you use it inside the render, the first
// render would be slower given the first time will create the stylesheet and add it to the cache
// TODO: p({ flexDirection: 'row' }, 'fl-row') to send an object and cache it with Stylesheet.create
// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style
// TODO: check if there are collisions like fl:dir:row:1 could be 'flexDirection: row' and 'flexDirectionRow: 1' (?)
// TODO: validate props and values (?)
// TODO: View, Text, Touchable, etc wrappers; so you use className prop instead of styles={p(...)}
// TODO: Conditional class as with cn(...)
import transform from "./pathTransform";
import { StyleSheet } from "react-native";

const stylesCache = Object.create(null);

export const p = (paths, className, nameSpace) => {
  let cache = stylesCache;

  if (nameSpace) {
    if (!cache[nameSpace]) {
      cache[nameSpace] = Object.create(null);
    }
    cache = cache[nameSpace];
  }

  const styles = paths.split(' ').map((path) => {
    if (isClassName(path)) {
      return cache[path];
    }

    // only creates the stylesheet if is going to be reused with a className
    const style = transform(path);
    if (className) {
      style = StyleSheet.Create(style);
    }
    
    return style;
  });

  if (className) {
    cache[className] = styles;
  }

  return styles;
};

export { default as useStyles } from './useStyles';


