// based on src/index.js
declare module 'react-native-use-styles' {
  type StyleObject = {
    [key: string]: unknown;
  };

  type UniqueSpace = symbol | string;

  type Computed = (dependencies: Array<any>) => StyleObject;

  type TagStyles = (strings: string[], expressions: string[]) => StyleObject;

  type useStyles = {
    (): (dependencies: Array<any>) => TagStyles;
    namespace: UniqueSpace;
  };

  export function useGlobalStyles(
    namespace: UniqueSpace,
    dependencies: Array<any>,
  ): TagStyles;

  export function GlobalUse(rawStyle: string, namespace: UniqueSpace): Computed;

  export function GlobalStyles(definition: StyleObject, namespace: UniqueSpace): void;

  export function Styles(
    definition: StyleObject,
    namespace: UniqueSpace,
  ): useStyles;

  export function getConstant(name: string, namespace: useStyles | UniqueSpace): any;

  export function setSeparator(newSeparator: string): void;
}
