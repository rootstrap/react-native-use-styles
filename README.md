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

### Global styles

```js
import { GlobalStyles } from "react-native-use-styles";

GlobalStyles({
  global: "flex:1 fx:dir:row"
});
```

Note that we are using aliases for the styles. This is equivalent to do:

```js
import { GlobalStyles } from "react-native-use-styles";

GlobalStyles({
  global: {
    flex: 1,
    flexDirection: "row"
  },
});
```

### Namespaced styles

```js
import { Styles } from "react-native-use-styles";

export default Styles({
  reused: "bg:color:green",
  local: ".global .reused color:purple"
});
```

Namespaced styles are a way to isolate a group of styles for a particular part of your app, it could be styles for a component, a screen, etc. This is a way to group semantically and avoid collisions between your styles' keys. Note that we are exporting the result of our definition. We'll use it next.

### Using styles

```js
import useStyles from "./my-namespaced-styles";

const component = () ⇒ {
  const s = useStyles();

  return (
    <Text styles={s`.global .local`}>
      Hello World!
    </Text>
  );
}
```

Note that we are classy now, and nobody would deny it.

There are plenty more things you can do with useStyles, learn more in [User Guide](USER_GUIDE.md)

## Performance

This library was created with performance in mind; useStyles has multiple cache layers to avoid unnecessary renders, calculations, and transformations.

## Contributing

We plan to keep working in the library to optimize and add new features (contributions are welcome):

- Add path variables
- Add informative errors
- Improve dynamic styling
- Add tests with renderers
- Benchmark
- Add Components with className:
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

**@rootstrap/react-native-use-styles** is available under the MIT license. See the LICENSE file for more info.

## Credits

**@rootstrap/react-native-use-styles** is maintained by [Rootstrap](http://www.rootstrap.com) with the help of our [contributors](https://github.com/rootstrap/react-native-use-styles/contributors).

[<img src="https://s3-us-west-1.amazonaws.com/rootstrap.com/img/rs.png" width="100"/>](http://www.rootstrap.com)
