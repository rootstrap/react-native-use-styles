import { useRef, useEffect, useCallback } from "react";
import { globalUse } from "./stylesPath";

// create local cache for returned arrays, so we can avoid re-renders
const cache = Object.create(null);

// namespace should be a symbol exported from the styles
export default (nameSpace) => {
  // TODO: is concurrency safe (?) is expensive (?)
  const uid = useRef(Date.now().toString());

  useEffect(() => {
    return () => {
      cache[uid.current] = null;
    };
  }, []);

  const use = useCallback((strings, ...expressions) => {
    const path = strings.reduce(
      (result, currentString, i) =>
        `${result}${currentString}${expressions[i] ? expressions[i] : ""}`,
      ""
    );

    if (!cache[uid.current]) {
      cache[uid.current] = Object.create(null);
    } else if (cache[uid.current][path]) {
      return cache[uid.current][path];
    }

    const styles = globalUse(path, nameSpace);
    Object.assign(cache[uid.current], { [path]: styles });

    return styles;
  }, []);

  return use;
};
