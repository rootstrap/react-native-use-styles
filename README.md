<h1 align="center"><img src="resources/logo.png" /></h1>

<p align="center">
  <a href="https://badge.fury.io/js/react-native-use-styles"><img src="https://badge.fury.io/js/react-native-use-styles.svg" alt="npm version" height="18"></a>
  <img src="https://travis-ci.com/rootstrap/react-native-use-styles.svg?branch=main" />
  <a href="https://codeclimate.com/github/rootstrap/react-native-use-styles/maintainability"><img src="https://api.codeclimate.com/v1/badges/6c949fe1a4afe72b3eeb/maintainability" /></a>
  <a href="https://codeclimate.com/github/rootstrap/react-native-use-styles/test_coverage"><img src="https://api.codeclimate.com/v1/badges/6c949fe1a4afe72b3eeb/test_coverage" /></a>
  <img src="https://img.shields.io/github/license/Naereen/StrapDown.js.svg" />
<p>

#### A classy approach

Did you ever want to organize your styles properly? This library contains an easy to use API that lets you organize your styles in a classy way.

## Installation

```
npm i react-native-use-styles
```

## Usage

### Using styles

```js
import useStyles from './my-namespaced-styles';

const Component = () ⇒ {
  const s = useStyles();

  return (
    <Text styles={s`.global .namespaced`}>
      Hello World!
    </Text>
  );
}
```

Note that we are classy now, and nobody would deny it. Next we'll define our `.global` and `.namespaced` styles to use them in our components as we are doing in this example.

### Global styles

`global-styles.js`

```js
import { GlobalStyles } from 'react-native-use-styles';

GlobalStyles({
  global: 'flex:1 fx:dir:row',
});
```

We are using aliases or shortcuts to define our styles. This is equivalent to do:

```js
import { GlobalStyles } from 'react-native-use-styles';

GlobalStyles({
  global: {
    flex: 1,
    flexDirection: 'row',
  },
});
```

### Namespaced styles

`my-namespaced-styles.js`

```js
import { Styles } from 'react-native-use-styles';

export default Styles({
  reused: 'bg:color:green',
  namespaced: '.global .reused color:purple',
});
```

Namespaced styles are a way to isolate a group of styles for a particular part of your app, it could be styles for a component, a screen, etc. This is a way to group semantically and avoid collisions between your styles. Note that we are exporting the result of our namespaced definition.

### Constants

```js
import { GlobalStyles } from 'react-native-use-styles';

GlobalStyles({
  constants: {
    purple: 'purple',
  },
  path: 'color:$purple',
  object: { color: '$purple' },
});
```

You can define constants in your global or namespaced styles that will be available to reuse with the `$` prefix.

### Computed and Dynamic styles

#### Computed styles:

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

And a simple style definition as following:

```js
import { Styles } from 'react-native-use-styles';

export default Styles({
  purple: { color: 'purple' },
});
```

There are plenty more things you can do with useStyles, learn more in [User Guide](USER_GUIDE.md)

### Definition order

You want your global styles to be defined or imported before all the other styles. So just import your global styles at the top of your `App.js` or your main entry point; before the imports of your custom or navigation component.

App.js

```js
import './globalStyles'; // ultra safe zone
import React from 'react';

import CustomComponent from './CustomComponent';

export default function App() {
  return <CustomComponent />;
}
```

### List of aliases

This is the current list of aliases available, we plan to add more.

```js
bot = bottom;
col = column;
dir = direction;
fx = flex;
lt = left;
rt = right;
bg = background;
txt = text;
jf = justify;
pd = padding;
wd = width;
hg = height;
```

### Performance

This library was created with performance in mind; useStyles has multiple cache layers to avoid unnecessary renders, calculations, and transformations. More info in the [User Guide](USER_GUIDE.md)

## Contributing

We plan to keep working in the library to optimize and add new features (contributions are welcome). If you have an idea that could make this library better we would love to hear it. Please take a look at our [Contributing Guidelines](CONTRIBUTING.md) to get to know the rules and how to get started with your contribution.

### How to run the demo app

In order to contribute with some code you will need to test your changes within the demo app. At the moment the mechanism that we are using to test the lib inside the app is to import it locally. That means that:

You need to install the dependencies on the library in production mode (`npm install --only=prod`) so you don't have problems with dual installations of react-native each time you make a change, you need to do a force install of the library inside the demo folder. If the problem persists, after you test or build the app you encounter duplicated issues, you may want to delete the modules of one of the packages, the lib or the demo app, to solve this issue.

If you are comfortable using something like [Wix's wml](https://github.com/wix/wml), it could provide a better development experience for you. We wanted the main contributing option to not require any extra installations or knowledge. Symlinks have not worked and that is why we recommend Wml.

## License

**react-native-use-styles** is available under the MIT license. See the LICENSE file for more info.

## Credits

**react-native-use-styles** is maintained by [Rootstrap](http://www.rootstrap.com) with the help of our [contributors](https://github.com/rootstrap/react-native-use-styles/contributors).

[<img src="https://s3-us-west-1.amazonaws.com/rootstrap.com/img/rs.png" width="100"/>](http://www.rootstrap.com)
