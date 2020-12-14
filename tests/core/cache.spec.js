import {
  setInCache,
  getFromCache,
  clearCache,
  getConstant,
} from '../../src/core/cache';

describe('utils', () => {
  beforeEach(() => {
    clearCache();
    console.warn = jest.fn();
  });

  it('setInCache sets in global cache properly', () => {
    setInCache({ style: true });
    expect(getFromCache('style')).toBe(true);
  });

  it('setInCache sets in namespaced cache properly', () => {
    setInCache({ style: true }, 'namespace');
    expect(getFromCache('style', 'namespace')).toBe(true);
  });

  it('getConstant gets the constant from global cache properly', () => {
    setInCache({ constants: { red: '#ff0000' } });
    expect(getConstant('red')).toBe('#ff0000');
  });

  it('getConstant gets the constant from string in namespace cache properly', () => {
    setInCache({ constants: { red: '#ff0000' } }, 'namespace');
    expect(getConstant('red', 'namespace')).toBe('#ff0000');
  });

  it('getConstant gets the constant from object in namespace cache properly', () => {
    const useStyles = () => {};
    useStyles.namespace = 'namespace';

    setInCache({ constants: { one: 1 } }, 'namespace');
    expect(getConstant('one', useStyles)).toBe(1);
  });

  it('Development mode only: getFromCache produces a console.warn when providing an Non-Existent-Namespace', () => {
    setInCache({ style: true });
    expect(getFromCache('style', 'namespace')).toBe(true);
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      'useStyles Non-Existent-Namespace: Namespace "namespace" does not exist or has not been imported. You are seeing this warning because you are in development mode. In a production build, there will be no warning.',
    );
  });

  it('Development mode only: getFromCache produces a console.warn when providing an Non-Existent-Constant', () => {
    expect(getFromCache('constant', null, null, true)).toBe(undefined);
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      `useStyles Non-Existent-Constant: Constant "constant" does not exist. You are seeing this warning because you are in development mode. In a production build, there will be no warning.`,
    );
  });

  it('Development mode only: getFromCache produces a console.warn when providing an Non-Existent-Style', () => {
    expect(getFromCache('style')).toBe(undefined);
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      `useStyles Non-Existent-Style: Style "style" does not exist. You are seeing this warning because you are in development mode. In a production build, there will be no warning.`,
    );
  });

  it('Development mode only: setInCache constant typo', () => {
    setInCache({ constant: { blue: 'blue' } });
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      'useStyles: "constant" key found in styles definition. Maybe you intended to use "constants" instead. You are seeing this warning because you are in development mode. In a production build, there will be no warning.',
    );
  });

  it('Development mode only: setInCache computeds typo', () => {
    setInCache({
      computeds: {
        style: () => {
          'blue';
        },
      },
    });
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      'useStyles: "computeds" key found in styles definition. Maybe you intended to use "computed" instead. You are seeing this warning because you are in development mode. In a production build, there will be no warning.',
    );
  });
});
