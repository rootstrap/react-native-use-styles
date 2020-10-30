// utils
export const CLASS_PREFIX = '.';
export const NAMESPACE_PREFIX = '@';
export const CONSTANTS_PREFIX = '$';
export const COMPTUED_PREFIX = '&';
export const NAMESPACE_REGEX = new RegExp(
  `@[^${CLASS_PREFIX}${CONSTANTS_PREFIX}${COMPTUED_PREFIX}]+`,
);

// cache
export const GLOBAL_KEY = '__global';
export const CONSTANTS_KEY = 'constants';
export const COMPUTED_KEY = 'computed';

// transform
export const DEFAULT_SEPARATOR = ':';
