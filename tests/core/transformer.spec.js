import transform, { hasPath, setSeparator } from '../../src/core/transformer';
import { setInCache, clearCache } from '../../src/core/cache';
import { getFromStorage } from '../../src/core/manager';

describe('utils', () => {
  beforeEach(() => {
    setSeparator(':');
    console.warn = jest.fn();
  });

  it('hasPath finds a path', () => {
    expect(hasPath('flex:dir:1')).toBe(true);
  });

  it("hasPath doesn't find a path", () => {
    expect(hasPath('.class')).toBe(false);
  });

  it('transforms key:value path', () => {
    expect(transform('flex:1')).toMatchObject({ flex: 1 });
  });

  it('transforms key:key:value path', () => {
    expect(transform('flex:direction:row')).toMatchObject({
      flexDirection: 'row',
    });
  });

  it('transforms key:key:key:value path', () => {
    expect(transform('border:bottom:color:grey')).toMatchObject({
      borderBottomColor: 'grey',
    });
  });

  it('transforms aliases for keys', () => {
    expect(transform('fx:1')).toMatchObject({
      flex: 1,
    });
  });

  it('transforms aliases for value', () => {
    expect(transform('flex:direction:col')).toMatchObject({
      flexDirection: 'column',
    });
  });

  it('transforms aliases for key:value', () => {
    expect(transform('fx:dir:col')).toMatchObject({
      flexDirection: 'column',
    });
  });

  it('transforms constants for key:$constant', () => {
    clearCache();
    setInCache({
      constants: {
        purple: 'purple',
      },
    });
    expect(
      transform('color:$purple', key => getFromStorage(key, null, null, true)),
    ).toMatchObject({
      color: 'purple',
    });
  });

  it('transforms constants for key:@namespace$constant', () => {
    clearCache();
    setInCache(
      {
        constants: {
          purple: 'purple',
        },
      },
      'namespace',
    );
    expect(
      transform('color:@namespace$purple', key =>
        getFromStorage(key, 'namespace', null, true),
      ),
    ).toMatchObject({
      color: 'purple',
    });
  });

  it('sets a separator', () => {
    setSeparator('-');
    expect(transform('flex-1')).toMatchObject({ flex: 1 });
  });

  it('Development mode only: transform produces a console.warn when providing an Invalid-Style-Key', () => {
    expect(transform('non-existent:1')).toMatchObject({ undefined: 1 });
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      'useStyles Invalid-Style-Key: "non-existent" is not a valid key for styles. You are seeing this warning because you are in development mode. In a production build, there will be no warning.',
    );
  });
});
