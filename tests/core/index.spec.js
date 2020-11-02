import React, { useState } from 'react';
import { Button } from 'react-native';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import { Styles } from '../../src/core/';
import { clearCache, getFromCache } from '../../src/core/cache';
import { GlobalUse, GlobalStyles } from '../../src/core/manager';

describe('utils', () => {
  beforeEach(() => {
    clearCache();
    console.warn = jest.fn();
    cleanup();
  });

  it('Styles sets cache properly', () => {
    Styles(
      {
        local: { flex: 1 },
      },
      'namespace',
    );
    expect(getFromCache('local', 'namespace')).toMatchObject({ flex: 1 });
  });

  it('Styles sets namespace and cache properly', () => {
    const hook = Styles({
      local: { flex: 1 },
    });
    expect(getFromCache('local', hook.namespace)).toMatchObject({ flex: 1 });
  });

  it('Styles sets constants cache properly', () => {
    Styles(
      {
        constants: {
          red: 'red',
        },
      },
      'namespace',
    );
    expect(getFromCache('red', 'namespace', null, true)).toBe('red');
  });

  it('GlobalUse gets namsepaced cache properly', () => {
    Styles(
      {
        local: { flex: 1 },
      },
      'namespace',
    );
    expect(GlobalUse('.local', 'namespace')()).toMatchObject({ flex: 1 });
  });

  it('GlobalUse gets namespaced constant cache properly', () => {
    Styles(
      {
        constants: {
          blue: 'blue',
        },
      },
      'namespace',
    );
    expect(GlobalUse('color:@namespace$blue')()).toMatchObject({
      color: 'blue',
    });
  });

  it('GlobalUse with computed values in namespace', () => {
    Styles(
      {
        computed: {
          disable: ([isDisabled]) => ({ color: isDisabled ? 'grey' : 'blue' }),
        },
      },
      'namespace',
    );
    expect(GlobalUse('@namespace&disable')([false])).toMatchObject({
      color: 'blue',
    });
  });

  it('GlobalUse gets global constant from namespaced style properly with definition', () => {
    GlobalStyles({
      constants: {
        blue: 'blue',
      },
    });
    Styles(
      {
        reused: 'color:$blue',
        namespaced: '.reused',
      },
      'namespace',
    );
    expect(GlobalUse('.namespaced', 'namespace')()).toMatchObject({
      color: 'blue',
    });
  });

  it('useGlobalStyles hook returns a style', () => {
    const useStyles = Styles({
      style: 'color:blue',
    });

    let s;
    const App = () => {
      s = useStyles();
      return null;
    };

    render(<App />);

    expect(s`.style`).toMatchObject({
      color: 'blue',
    });
  });

  it('useGlobalStyles hook returns a cached style', () => {
    const useStyles = Styles({
      style: 'color:blue',
    });

    let s;
    const App = () => {
      s = useStyles();
      return null;
    };

    render(<App />);

    s`.style`;
    expect(s`.style`).toMatchObject({
      color: 'blue',
    });
  });

  it('useGlobalStyles hook returns a computed style', () => {
    const useStyles = Styles({
      computed: {
        style: () => 'color:blue',
      },
    });

    let s;
    const App = () => {
      s = useStyles();
      return null;
    };

    render(<App />);

    expect(s`&style`).toMatchObject({
      color: 'blue',
    });
  });

  it('useGlobalStyles hook returns a recomputed style', () => {
    const useStyles = Styles({
      computed: {
        style: ([isFirst]) => ({ color: isFirst ? 'blue' : 'red' }),
      },
    });

    let s;
    const App = () => {
      const [isFirst, setIsFirst] = useState(true);
      s = useStyles([isFirst]);

      return (
        <Button
          styles={s`&style`}
          title="changeState"
          testID="changeState"
          onPress={() => setIsFirst(current => !current)}
        />
      );
    };

    const { getByTestId } = render(<App />);
    fireEvent.press(getByTestId('changeState'));

    expect(s`&style`).toMatchObject({
      color: 'red',
    });
  });
});
