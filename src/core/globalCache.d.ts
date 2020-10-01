export function clearCache(): void;

export function setInCache(
  definition: unknown,
  namespace: string
): void;

export function getFromCache(
  key: string,
  namespace: string,
  definition: unknown,
  isConstant: boolean
): unknown;
