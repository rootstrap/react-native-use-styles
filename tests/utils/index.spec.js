import {
  getKey,
  getNamespace,
  isNamespace,
  getPathFromLiteralTag,
  hasConstant,
  hasComputed,
  hasClassName,
} from '../../src/utils';

describe('utils', () => {
  it('hasComputed finds the computed', () => {
    expect(hasComputed('&computed')).toBe(true);
  });

  it('hasComputed finds the computed when is namespaced', () => {
    expect(hasComputed('@namespace&isComputed')).toBe(true);
  });

  it("hasComputed doesn't find the computed", () => {
    expect(hasComputed('fx:dir:row')).toBe(false);
  });

  it('hasComputed finds the computed when multiple styles', () => {
    expect(hasComputed('.classname &computed')).toBe(true);
  });

  it('hasClassName finds the class', () => {
    expect(hasClassName('.classname')).toBe(true);
  });

  it('hasClassName finds the class when is namespaced', () => {
    expect(hasClassName('@namespace.classname')).toBe(true);
  });

  it("hasClassName doesn't find the class", () => {
    expect(hasClassName('fx:dir:row')).toBe(false);
  });

  it('getKeyFromPath gets the key', () => {
    expect(getKey('.local')).toBe('local');
  });

  it('isNamespaceClass finds the namespace', () => {
    expect(isNamespace('@namespace.classname')).toBe(true);
  });

  it("isNamespaceClass doesn't find the namespace", () => {
    expect(isNamespace('.classname')).toBe(false);
  });

  it('getNamespace gets the namespace', () => {
    expect(getNamespace('@namespace.classname')).toBe('namespace');
  });

  it('getPathFromLiteralTag flattens the array properly', () => {
    const strings = ['Hello ', '!'];
    const expressions = ['World'];
    const expected = 'Hello World!';
    expect(getPathFromLiteralTag(strings, expressions)).toBe(expected);
  });

  it('hasConstant finds a constant', () => {
    expect(hasConstant('$constant')).toBe(true);
  });

  it("hasConstant doesn't find a constant", () => {
    expect(hasConstant('.class')).toBe(false);
  });

  it('hasConstant finds a namespaced constant', () => {
    expect(hasConstant('@namespace$constant')).toBe(true);
  });
});
