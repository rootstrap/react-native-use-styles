import { clearCache, getFromCache } from '../../src/core/cache';
import { GlobalStyles, GlobalUse } from '../../src/core/manager';

describe('utils', () => {
  beforeEach(() => {
    clearCache();
    console.warn = jest.fn();
  });

  it('GlobalStyles sets in global cache properly', () => {
    GlobalStyles({
      global: { flex: 1 },
    });
    expect(getFromCache('global')).toMatchObject({ flex: 1 });
  });

  it('GlobalStyles sets in namespaced cache properly', () => {
    GlobalStyles(
      {
        local: { flex: 1 },
      },
      'namespace',
    );
    expect(getFromCache('local', 'namespace')).toMatchObject({ flex: 1 });
  });

  it('GlobalStyles sets constants cache properly', () => {
    GlobalStyles({
      constants: {
        red: 'red',
      },
    });
    expect(getFromCache('red', null, null, true)).toBe('red');
  });

  it('GlobalStyles with falsey value', () => {
    GlobalStyles({
      style: 'false',
    });
    expect(getFromCache('style')).toMatchObject({});
  });

  it('GlobalUse gets global cache properly', () => {
    GlobalStyles({
      global: { flex: 1 },
    });
    expect(GlobalUse('.global')()).toMatchObject({ flex: 1 });
  });

  it('GlobalUse gets constant from global style properly', () => {
    GlobalStyles({
      constants: {
        blue: 'blue',
      },
    });
    expect(GlobalUse('color:$blue')()).toMatchObject({
      color: 'blue',
    });
  });

  it('GlobalUse gets global constant from namespaced style properly', () => {
    GlobalStyles({
      constants: {
        blue: 'blue',
      },
    });
    expect(GlobalUse('color:$blue', 'namespace')()).toMatchObject({
      color: 'blue',
    });
  });

  it('GlobalUse gets global constant from style object properly', () => {
    GlobalStyles({
      constants: {
        blue: 'blue',
      },
    });
    expect(GlobalUse({ color: '$blue' }, 'namespace')()).toMatchObject({
      color: 'blue',
    });
  });

  it('GlobalUse with computed values', () => {
    GlobalStyles({
      computed: {
        disable: ([isDisabled]) => ({ color: isDisabled ? 'grey' : 'blue' }),
      },
    });
    expect(GlobalUse('&disable')([true])).toMatchObject({
      color: 'grey',
    });
  });

  it('GlobalUse with computed values and constants on style object', () => {
    GlobalStyles({
      constants: {
        grey: 'grey',
      },
      computed: {
        disable: ([isDisabled]) => ({ color: isDisabled ? '$grey' : 'blue' }),
      },
    });
    expect(GlobalUse('&disable')([true])).toMatchObject({
      color: 'grey',
    });
  });

  it("GlobalUse with computed don't find value", () => {
    GlobalStyles({
      computed: {
        notDisable: ([isDisabled]) => ({
          color: isDisabled ? 'grey' : 'blue',
        }),
      },
    });
    expect(GlobalUse('&disable')([true])).toMatchObject({});
  });

  it('GlobalUse gets constant from style object properly', () => {
    GlobalStyles({
      constants: {
        blue: 'blue',
      },
      local: { color: '$blue' },
    });
    expect(GlobalUse('.local')()).toMatchObject({
      color: 'blue',
    });
  });

  it('GlobalUse gets constant cache properly', () => {
    GlobalStyles({
      constants: {
        blue: 'blue',
      },
    });
    expect(GlobalUse('color:$blue')()).toMatchObject({
      color: 'blue',
    });
  });

  it('GlobalUse gets constant from definition properly', () => {
    GlobalStyles({
      constants: {
        blue: 'blue',
      },
      local: 'color:$blue',
    });
    expect(GlobalUse('.local')()).toMatchObject({
      color: 'blue',
    });
  });

  it('GlobalUse gets style from definition properly', () => {
    GlobalStyles({
      local: 'color:blue',
      reused: '.local',
    });
    expect(GlobalUse('.reused')()).toMatchObject({
      color: 'blue',
    });
  });

  it('GlobalUse generates path styles properly', () => {
    expect(GlobalUse('max:height:300')()).toMatchObject({ maxHeight: 300 });
  });

  it('GlobalUse with falsey value false', () => {
    expect(GlobalUse('color:red false')()).toMatchObject({
      color: 'red',
    });
  });

  it('GlobalUse with falsey value undefined', () => {
    expect(GlobalUse('color:red undefined')()).toMatchObject({
      color: 'red',
    });
  });

  it('GlobalUse with only falsey value undefined', () => {
    expect(GlobalUse('color:red null')()).toMatchObject({
      color: 'red',
    });
  });

  it('GlobalUse with only falsey value', () => {
    expect(GlobalUse('undefined')()).toMatchObject({});
  });

  it('Development mode only: GlobalUse produces a console.warn when providing a non-existent namespace', () => {
    GlobalStyles({
      constants: {
        blue: 'blue',
      },
    });
    GlobalUse('color:@not-a-namespace$blue')();
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      `useStyles Non-Existent-Namespace: Namespace "not-a-namespace" does not exist or has not been imported. You are seeing this warning because you are in development mode. In a production build, there will be no warning.`,
    );
  });

  it('Development mode only: GlobalStyles produces a console.warn when providing an Invalid-Style-Type', () => {
    GlobalStyles({
      computed: {
        insideComputed: ([isColored]) => ({
          color: isColored ? 'red' : 'blue',
        }),
      },
      outsideComputed: ([isColored]) => ({ color: isColored ? 'red' : 'blue' }),
    });
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      'useStyles Invalid-Style-Type: Style "outsideComputed" is not valid. Computed styles are placed inside the computed section. You are seeing this warning because you are in development mode. In a production build, there will be no warning.',
    );
  });
});
