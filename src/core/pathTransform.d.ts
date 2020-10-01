export let separator: string;
export function setSeparator(sp: string): void;

declare function pathTransform(
  path: string,
  getConstant: Function
): object;

export default pathTransform;
