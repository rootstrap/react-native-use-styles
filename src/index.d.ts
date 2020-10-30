type StyleObject = {
  [key: string]: unknown;
};

type Computed = (dependencies: Array<any>) => StyleObject;

export function setSeparator(newSeparator: string): void;

export function GlobalUse(rawStyle: string, namespace: string): Computed;

export function useGlobalStyles(
  nameSpace: string,
  dependencies: Array<any>,
): (strings: string[], expressions: string[]) => StyleObject;

export function GlobalStyles(definition: StyleObject, namespace: string): void;

export function Styles(
  definition: StyleObject,
  namespace: string,
): {
  (): () => typeof useGlobalStyles;
  namespace: string;
};
