import { useRef, useEffect, useCallback } from "react";
import { globalUse } from "./stylesPath";

// create local cache for returned arrays, so we can avoid re-renders
const localCache = Object.create(null);

// namespace should be a symbol exported from the styles
export default (nameSpace) => {
  // TODO: is concurrency safe (?) is expensive (?)
  const uid = useRef(Date.now().toString());

  useEffect(() => {
    return () => {
      delete localCache[uid.current];
    };
  }, []);

  const cs = useCallback((strings, ...expressions) => {
    const path = strings.reduce(
      (result, currentString, i) =>
        `${result}${currentString}${expressions[i] ? expressions[i] : ""}`,
      ""
    );

    if (!localCache[uid.current]) {
      localCache[uid.current] = Object.create(null);
    } else if (localCache[uid.current][path]) {
      return localCache[uid.current][path];
    }

    const styles = globalUse(path, nameSpace);
    Object.assign(localCache[uid.current], { [path]: styles });

    return styles;
  }, []);

  return cs;
};
