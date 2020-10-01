export type StyleObject = {
  [key: string]: unknown;
};

export function isNamespace(path: string): boolean;
export function getKeyFromNamespace(path: string): string;
export function getKey(path: string): string;
export function getNamespace(path: string): string;
export function isClassName(path: string): boolean;
export function isConstant(path: string): boolean;
export function isFalseyString(value: string): boolean;
export function flattenStyles(styles: StyleObject[]): StyleObject;
export function getPathFromLiteralTag(strings: string[], expressions: string[]): string;

export namespace StyleSheetNoop {
    function flatten(styles: any): any;
    function create(styles: any): any;
}
