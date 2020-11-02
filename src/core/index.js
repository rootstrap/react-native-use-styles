import { useRef } from 'react';
import { hasComputed, getPathFromLiteralTag } from '../utils';
import { GlobalUse, GlobalStyles } from './manager';

const recomputeMutation = (cache, dependencies) => {
  for (let [key, { compute }] of Object.entries(cache)) {
    if (hasComputed(key)) {
      cache[key] = {
        compute,
        style: compute(dependencies),
      };
    }
  }
};

export const useGlobalStyles = (nameSpace, dependencies = []) => {
  // create local cache for returned styles, so we can avoid re renders, transformations and computations
  const lastDependencies = useRef(dependencies);
  const localCache = useRef(Object.create(null));
  const cache = localCache.current;

  // manual shallow compare; not using useEffect because it would need to render twice
  // given the necessity of explicitly telling react to queue an update with set[State]
  // after recomputing styles
  if (
    lastDependencies.current.some((dep, index) => dep !== dependencies[index])
  ) {
    recomputeMutation(cache, dependencies);
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
