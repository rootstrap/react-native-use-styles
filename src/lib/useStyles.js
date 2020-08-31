import { useRef, useEffect, useCallback } from "react";
import { globalUse } from "./stylesPath";

// create local cache for returned arrays, so we can avoid re-renders
const cache = Object.create(null);

export default (nameSpace) => {
  // TODO: is concurrency safe (?) is expensive (?)
  const uid = useRef(Date.now().toString());

  useEffect(() => {
    cache[uid.current] = Object.create(null);

    return () => {
      cache[uid.current] = null;
    };
  }, []);

  return useCallback((path) => {
    const memoizedStyles = cache[uid.current][path];
    if (memoizedStyles) {
      return memoizedStyles;
    }

    const styles = globalUse(path, nameSpace);
    Object.assign(cache[uid.current], { [path]: styles });

    return styles;
  }, []);
};
