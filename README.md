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
import useStyles from "./my-namespaced-styles";

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
import { GlobalStyles } from "react-native-use-styles";

GlobalStyles({
  global: "flex:1 fx:dir:row"
});
```

We are using aliases or shortcuts to define our styles. This is equivalent to do:

```js
import { GlobalStyles } from "react-native-use-styles";

GlobalStyles({
  global: {
    flex: 1,
    flexDirection: "row"
  },
});
```

You should import your `GlobalStyles` at the top of you `App.js` or main entry point. Learn more in [User Guide](https://github.com/rootstrap/react-native-use-styles/blob/master/USER_GUIDE.md#definition-order).

### Namespaced styles

`my-namespaced-styles.js`
```js
import { Styles } from "react-native-use-styles";

export default Styles({
  reused: "bg:color:green",
  namespaced: ".global .reused color:purple"
});
```

Namespaced styles are a way to isolate a group of styles for a particular part of your app, it could be styles for a component, a screen, etc. This is a way to group semantically and avoid collisions between your styles. Note that we are exporting the result of our namespaced definition. 

There are plenty more things you can do with useStyles, learn more in [User Guide](USER_GUIDE.md)

## Definition order

All style definitions reused in other style definitions must be defined (imported) before; otherwise, you will end up with an undefined style. You cannot use styles of something that is not yet defined.

## Performance

This library was created with performance in mind; useStyles has multiple cache layers to avoid unnecessary renders, calculations, and transformations.

## Contributing

We plan to keep working in the library to optimize and add new features (contributions are welcome):

- Add informative errors
- Improve dynamic styling
- Add tests with renderers
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
