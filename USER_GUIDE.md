## User Guide

Hi, 😄 welcome to the User's guide to using 'useStyles'. With 'useStyles' you can easily de-clutter 💆‍♂️ your style code and write a better and more efficient styling code 🤩.

This is a comprehensive guide that will let you get started easily.

### Installation

To install the library in your workspace, use the following command.

```
npm i react-native-use-styles
```

### Path notation and aliases

Apart from traditional styles object you can, by using the library, adopt a different approach.

In the following code we have easily created a shortcut for the style, that will set the background color to purple.

```js
import { Styles } from 'react-native-use-styles';

export default Styles({
  purple: 'bg:color:purple',
});
```

When we use aliases or path notation, the library transforms these paths into valid styles object.

The above given code is equivalent to the approach given below.

```js
import { Styles } from 'react-native-use-styles';

export default Styles({
  purple: {
    backgroundColor: 'purple',
  },
});
```

### Computed and Dynamic styles

'Computed styles' and 'Dynamic styles' can be easily applied using the following approach, while using 'useStyles' library.

#### Computed styles:

Here's the approach to use 'Computed Styles' using 'useStyles'.

```js
import useStyles from './my-namespaced-styles';

const Component = () ⇒ {
  const isPurple = useState(true);
  const s = useStyles([isPurple]);

  return (
    <Text styles={s`fx:1 &purple`}>
      Hello World!
    </Text>
  );
}
```

Computed styles are prefixed with the `&` character. Note that we are passing isPurple as a hook's dependency to track it changes. We can then use this dependency in our computed styles as following.

```js
import { Styles } from 'react-native-use-styles';

export default Styles({
  computed: {
    purple: ([isPurple]) => ({ color: isPurple ? 'purple' : 'black' });
  }
});
```

If the dependencies change, only styles with a computed in it will be recomputed.

#### Dynamic styles:

Here's the approach to use 'Dynamic Styles' using 'useStyles'.

```js
import useStyles from './my-namespaced-styles';

const Component = () ⇒ {
  const isPurple = useState(true);
  const s = useStyles();

  return (
    <Text styles={s`fx:1 ${isPurple && '.purple'}`}>
      Hello World!
    </Text>
  );
}
```

And a simple styles definition as following:

```js
import { Styles } from 'react-native-use-styles';

export default Styles({
  purple: { color: 'purple' },
});
```

### Styles namespace name

Here's the approach for using a custom namespace name.

```js
import { Styles } from 'react-native-use-styles';

const namespace = 'sample';

export default Styles(
  {
    purple: 'color:purple',
  },
  namespace
);
```

You can manually define the namespace name if you want, this is useful for particular cases as we'll see next.

### Using another namespaced style

This is the use case for using the above mentioned approach.

```js
import useStyles from './my-namespaced-styles';

const Component = () ⇒ {
  const s = useStyles();

  return (
    <Text styles={s`@sample.purple`}>
      Hello World!
    </Text>
  );
}
```

```js
import { Styles } from 'react-native-use-styles';

export default Styles({
  anotherNamespace: 'fx:1 @sample.purple',
});
```

Something to take into consideration is that the namespace @sample should be defined (imported) before being used, otherwise it'll undefined.

### useGlobalStyles

```js
import { useGlobalStyles } from 'react-native-use-styles';

const Component = () ⇒ {
  const s = useGlobalStyles();

  return (
    <Text styles={s`.global`}>
      Hello World!
    </Text>
  );
}
```

If you are not going to use namespaced styles you can use `useGlobalStyles` to get your global styles directly. Actually `useStyles` is a wrapper of `useGlobalStyles`: `useStyles = (dependencies) => useGlobalStyles(namespace, dependencies)`.

### GlobalUse

```js
import { GlobalUse } from 'react-native-use-styles';

const s = (styles) => GlobalUse(styles, 'namespace')();

const Component = () ⇒ {
  return (
    <Text styles={s('.global .local')}>
      Hello World!
    </Text>
  );
}
```

If you don't want to use the hook, you can use directly the `GlobalUse` function to access the styles. You can pass a namespace as a parameter to get styles from a particular namespace. Be aware that this function is not using the component cache layer (more info about this layer in the next section).

### Cache layers

The library has 3 cache layers; the first one is at component level, this is mostly to avoid re-renders. Let's say we have the following component:

```js
import useStyles from './my-namespaced-styles';

const Component = () ⇒ {
  const s = useStyles();

  return (
    <Text styles={s`.global .local color:purple`}>
      Hello World!
    </Text>
  );
}
```

The `s` function will always return the same cached styles object, to avoid re-renders, and re-transformation for the `color:purple`. In this case, the result will be:

```js
import useStyles from './my-namespaced-styles';

const Component = () ⇒ {
  const s = useStyles();

  return (
    <Text styles={{ ...globalStyles , ...localStyles, ...{ color: 'purple' } }}>
      Hello World!
    </Text>
  );
}
```

This cache will be cleared once you unmount the component. The second cache layer is at global level and it's actually where all the GlobalStyles and Styles definitions resides as a centralized styles storage. There's a third cache layer, the native layer, we are used to using this cache layer directly in `react-native` when we use the `StyleSheet` API (actually this API seems not to be caching in recent versions). This API caches the styles but in the native thread so you avoid sending your styles objects through the bridge every time you use them.

### setSeparator

```js
import { setSeparator, GlobalStyles } from 'react-native-use-styles';

setSeparator('-');

export default GlobalStyles({
  purple: 'fx-1 fx-direction-row',
});
```

You can change the separator used in the styles' definitions.
