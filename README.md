<p align="center"><img src="resources/logo.png" /></p>

<p align="center">
  <img src="https://img.shields.io/github/license/Naereen/StrapDown.js.svg" />
<p>

#### A classy approach.

Did you ever want to organize your styles properly? This library contains an easy to use API that lets you organize your styles in a classy way.

## Installation

```
npm install react-native-use-styles --save
```

## Usage

### Using styles

```js
import useStyles from './my-namespaced-styles';

const component = () ⇒ {
  const s = useStyles();

  return (
    <Text styles={s`.global .namespaced`}>
      Hello World!
    </Text>
  );
}
```

Note that we are classy now, and nobody would deny it. Next we'll define our `.global` and `.namespaced` style to use them in our components as we are doing in this example.

### Global styles

`global-styles.js`
```js
import { GlobalStyles } from 'react-native-use-styles';

GlobalStyles({
  global: 'flex:1 fx:dir:row'
});
```

We are using aliases or shortcuts to define our styles. This is equivalent to do:

```js
import { GlobalStyles } from 'react-native-use-styles';

GlobalStyles({
  global: {
    flex: 1,
    flexDirection: 'row'
  },
});
```

### Namespaced styles

`my-namespaced-styles.js`
```js
import { Styles } from 'react-native-use-styles';

export default Styles({
  reused: 'bg:color:green',
  namespaced: '.global .reused color:purple'
});
```

Namespaced styles are a way to isolate a group of styles for a particular part of your app, it could be styles for a component, a screen, etc. This is a way to group semantically and avoid collisions between your styles. Note that we are exporting the result of our namespaced definition. 

### Constants

```js
import { GlobalStyles } from 'react-native-use-styles';

GlobalStyles({
  constants: {
    purple: 'purple'
  },
  reused: 'color:$purple'
});
```

You can define constants in your global or namespaced styles that will be available to reuse with the `$` prefix.

There are plenty more things you can do with useStyles, learn more in [User Guide](USER_GUIDE.md)

### Definition order

You want your global styles to be defined or imported before all the other styles. So just import your global styles at the top of your `App.js` or your main entry point; before the imports of your custom or navigation component.

App.js
```js
import './globalStyles'; // ultra safe zone
import React from 'react';

import CustomComponent from './CustomComponent';

export default function App() {
  return (
    <CustomComponent />
  );
}
```

### List of aliases

This is the current list of aliases available, we plan to add more.

```js
bot  =  bottom
col  =  column
dir  =  direction
fx   =  flex
lt   =  left
rt   =  right
bg   =  background
txt  =  text
jf   =  justify
pd   =  padding
wd   =  width
hg   =  height
```

### Performance

This library was created with performance in mind; useStyles has multiple cache layers to avoid unnecessary renders, calculations, and transformations. More info in the [User Guide](USER_GUIDE.md)

## Contributing

We plan to keep working in the library to optimize and add new features (contributions are welcome):

- Add informative errors
- Improve dynamic styling
- Add tests with test renderers
- Add tests to a pre-push hook
- Benchmark
- Make library definition order safe (?)
- Add Components with className (?)
```js
import namespace from './my-namespaced-styles';
const { Text } = namespace;

const component = () ⇒ {
  return (
    <Text className=".global-style .local-style">
      Hello World!
    </Text>
  );
}
```

If you have an idea that could make this library better we would love to hear it. Please take a look at our [Contributing Guidelines](CONTRIBUTING.md) to get to know the rules and how to get started with your contribution.

## License

**react-native-use-styles** is available under the MIT license. See the LICENSE file for more info.

## Credits

**react-native-use-styles** is maintained by [Rootstrap](http://www.rootstrap.com) with the help of our [contributors](https://github.com/rootstrap/react-native-use-styles/contributors).

[<img src="https://s3-us-west-1.amazonaws.com/rootstrap.com/img/rs.png" width="100"/>](http://www.rootstrap.com)
