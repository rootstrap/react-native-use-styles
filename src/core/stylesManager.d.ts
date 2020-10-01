import { StyleObject } from "./utils";

export function getFromDefinitionOrCache(
  pKey: string,
  namespace: string,
  definition: StyleObject,
  isConstant?: boolean
): StyleObject;

export function GlobalUse(path: string, namespace: string): StyleObject;

export function useGlobalStyles(nameSpace: string): (strings: string[], expressions: string[]) => StyleObject;

export function GlobalStyles(
  definition: StyleObject,
  namespace: string
): void;

export function Styles(definition: StyleObject, namespace: string): {
  (): () => typeof useGlobalStyles;
  namespace: string;
};
