// based on src/index.js
type StyleObject = {
  [key: string]: unknown;
};

type UniqueSpace = symbol | string;

type Computed = (dependencies?: Array<any>) => StyleObject;

type TagStyles = (strings: string[], expressions: string[]) => StyleObject;

type UseStyles = {
  (): (dependencies?: Array<any>) => TagStyles;
  namespace: UniqueSpace;
};

export function useGlobalStyles(
  namespace?: UniqueSpace,
  dependencies?: Array<any>,
): TagStyles;

export function GlobalUse(rawStyle: string, namespace?: UniqueSpace): Computed;

export function GlobalStyles(definition: StyleObject, namespace?: UniqueSpace): void;

export function Styles(
  definition: StyleObject,
  namespace?: UniqueSpace,
): UseStyles;

export function getConstant(name: string, namespace?: UseStyles | UniqueSpace): any;

export function setSeparator(newSeparator: string): void;
