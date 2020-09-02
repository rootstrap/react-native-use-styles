'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var Stylesheet = _interopDefault(require('react-native'));

// SOURCE: https://github.com/facebook/react-native/blob/d2045411f5771a8c7275c1388179fef3892e9f53/Libraries/Components/View/ReactNativeViewViewConfig.js
// TODO: remove prototype from inner objects (?)
// TODO: add and export symbols for aliases (?)
var stylesDictionary = Object.assign(Object.create(null), {
  align: {
    content: { __propName: "alignContent" },
    items: { __propName: "alignItems" },
    self: { __propName: "alignSelf" },
  },
  aspect: { ratio: { __propName: "aspectRatio" } },
  backface: { visibility: { __propName: "backfaceVisibility" } },
  background: { color: { __propName: "backgroundColor" } },
  border: {
    bottom: {
      color: { __propName: "borderBottomColor" },
      end: { radius: { __propName: "borderBottomEndRadius" } },
      left: { radius: { __propName: "borderBottomLeftRadius" } },
      right: { radius: { __propName: "borderBottomRightRadius" } },
      start: { radius: { __propName: "borderBottomStartRadius" } },
      width: { __propName: "borderBottomWidth" },
    },
    color: { __propName: "borderColor" },
    end: {
      color: { __propName: "borderEndColor" },
      width: { __propName: "borderEndWidth" },
    },
    left: {
      color: { __propName: "borderLeftColor" },
      width: { __propName: "borderLeftWidth" },
    },
    radius: { __propName: "borderRadius" },
    right: {
      color: { __propName: "borderRightColor" },
      width: { __propName: "borderRightWidth" },
    },
    start: {
      color: { __propName: "borderStartColor" },
      width: { __propName: "borderStartWidth" },
    },
    style: { __propName: "borderStyle" },
    top: {
      color: { __propName: "borderTopColor" },
      end: { radius: { __propName: "borderTopEndRadius" } },
      left: { radius: { __propName: "borderTopLeftRadius" } },
      right: { radius: { __propName: "borderTopRightRadius" } },
      start: { radius: { __propName: "borderTopStartRadius" } },
      width: { __propName: "borderTopWidth" },
    },
  },
  bottom: { __propName: "bottom" },
  color: { __propName: "color" },
  decomposed: { matrix: { __propName: "decomposedMatrix" } },
  direction: { __propName: "direction" },
  display: { __propName: "display" },
  elevation: { __propName: "elevation" },
  end: { __propName: "end" },
  flex: {
    __propName: "flex",
    basis: { __propName: "flexBasis" },
    direction: { __propName: "flexDirection" },
    grow: { __propName: "flexGrow" },
    shrink: { __propName: "flexShrink" },
    wrap: { __propName: "flexWrap" },
  },
  font: {
    family: { __propName: "fontFamily" },
    size: { __propName: "fontSize" },
    style: { __propName: "fontStyle" },
    variant: { __propName: "fontVariant" },
    weight: { __propName: "fontWeight" },
  },
  height: "height",
  include: { font: { padding: { __propName: "includeFontPadding" } } },
  justify: { content: { __propName: "justifyContent" } },
  left: { __propName: "left" },
  letter: { spacing: { __propName: "letterSpacing" } },
  line: { height: { __propName: "lineHeight" } },
  margin: {
    __propName: "margin",
    bottom: { __propName: "marginBottom" },
    end: { __propName: "marginEnd" },
    horizontal: { __propName: "marginHorizontal" },
    left: { __propName: "marginLeft" },
    right: { __propName: "marginRight" },
    start: { __propName: "marginStart" },
    top: { __propName: "marginTop" },
    vertical: { __propName: "marginVertical" },
  },
  max: {
    height: { __propName: "maxHeight" },
    width: { __propName: "maxWidth" },
  },
  min: {
    height: { __propName: "minHeight" },
    width: { __propName: "minWidth" },
  },
  opacity: { __propName: "opacity" },
  overflow: { __propName: "overflow" },
  overlay: { color: { __propName: "overlayColor" } },
  padding: {
    __propName: "padding",
    bottom: { __propName: "paddingBottom" },
    end: { __propName: "paddingEnd" },
    horizontal: { __propName: "paddingHorizontal" },
    left: { __propName: "paddingLeft" },
    right: { __propName: "paddingRight" },
    start: { __propName: "paddingStart" },
    top: { __propName: "paddingTop" },
    vertical: { __propName: "paddingVertical" },
  },
  postion: { __propName: "position" },
  resize: { mode: { __propName: "resizeMode" } },
  right: { __propName: "right" },
  rotation: { __propName: "rotation" },
  scale: {
    x: { __propName: "scaleX" },
    y: { __propName: "scaleY" },
  },
  shadow: {
    color: { __propName: "shadowColor" },
    offset: { __propName: "shadowOffset" },
    opacity: { __propName: "shadowOpacity" },
    radius: { __propName: "shadowRadius" },
  },
  start: { __propName: "start" },
  text: {
    align: {
      __propName: "textAling",
      vertical: { __propName: "textAlignVertical" },
    },
    decoration: {
      color: { __propName: "textDecorationColor" },
      line: { __propName: "textDecorationLine" },
      style: { __propName: "textDecorationStyle" },
    },
    shadow: {
      color: { __propName: "textShadowColor" },
      offset: { __propName: "textShadowOffset" },
      radius: { __propName: "textShadowRadius" },
    },
    transform: { __propName: "textTransform" },
  },
  tint: { color: { __propName: "tintColor" } },
  top: { __propName: "top" },
  transform: { __propName: "transform" }, //TODO: not supported, not primitive value, this receives an array
  translate: {
    x: { __propName: "translateX" },
    y: { __propName: "translateY" },
  },
  width: { __propName: "width" },
  z: { index: { __propName: "zIndex" } },
});

/* Use cases:
  input: 'fx:dir:col'
  output: { flexDirection: 'column' }
*/
var aliasesDictionary = Object.assign(Object.create(null), {
  bot: "bottom",
  col: "column",
  dir: "direction",
  fx: "flex",
  lt: "left",
  rt: "right",
});

const separator = ":";

const getKeyFromParts = (node, parts, pos) => {
  let currentPart = parts[pos];
  currentPart = aliasesDictionary[currentPart] || currentPart;

  return node[currentPart];
};

const getValueFromParts = (parts, pos) => {
  let newPos = pos;
  let value = "";

  while (newPos < parts.length) {
    let newValue = parts[newPos];
    newValue = aliasesDictionary[newValue] || newValue;

    value += ` ${newValue}`;

    newPos += 1;
  }
  value = value.substring(1);
  value = parseFloat(value) || value;

  return [value, newPos];
};

// PRECONDITION: at least one key-value pair exists in the path
/* Use cases:
  input: "fx:1" // Done
  output:
  {
    flex: 1
  }

  input: "fx:1:2" // Done
  output:
  {
    flex: 1 2
  }

  input: "fx:dir:row" // Done
  output:
  {
    flexDirection: 'row'
  }

  input: "fx:1:2:dir:row"
  output:
  {
    flex: 1 2,
    flexDirection: row
  }
*/
var transform = (path) => {
  let style = Object.create(null);
  const parts = path.split(separator);

  // iterates until find a value, then iterates until find another key or until end
  let currentNode = getKeyFromParts(stylesDictionary, parts, 0);
  let pos = 1;
  while (pos < parts.length) {
    const lastNode = currentNode;
    currentNode = getKeyFromParts(currentNode, parts, pos);

    // if it's an object we need to keep digging
    // otherwise is undefined cause we found a value
    if (!currentNode) {
      const [value, newPos] = getValueFromParts(parts, pos);
      pos = newPos;

      Object.assign(style, {
        [lastNode.__propName]: value,
      });
    }

    pos += 1;
  }

  return style;
};

const setSeparator = (sp) => {
  SEPARATOR = sp;
};

const isFalseyString = (value) => {
  try {
    return value === "undefined" || JSON.parse(value);
  } catch (_) {
    return false;
  }
};

const isClassName = (path) => path.startsWith(".");

const getClassName = (path) => path.substring(1);

const flattenStyles = (styles) => {
  return styles.reduce(
    (flattenStyles, style) => Object.assign(flattenStyles, style),
    Object.create(null)
  );
};

// TODO: p(124235, 'fl-row') to send the identifier of a Stylesheet.create style

const globalCache = Object.create(null);

const getFromCache = (className, namespace) => {
  let style;

  if (!namespace) {
    style = globalCache[className];
  } else {
    style =
      (globalCache[namespace] && globalCache[namespace][className]) ||
      globalCache[className];
  }

  // get style from stylesheet id
  return Stylesheet.flatten(style);
};

const setInCache = (definition, namespace) => {
  const nativeCache = Stylesheet.create(definition);

  if (!namespace) {
    Object.assign(globalCache, nativeCache);
  } else {
    if (!globalCache[namespace]) {
      globalCache[namespace] = Object.create(null);
    }

    Object.assign(globalCache[namespace], nativeCache);
  }
};

const globalDefine = (definition, namespace) => {
  for (let [key, value] of Object.entries(definition)) {
    if (typeof value !== "object") {
      const styles = value
        .trim()
        .split(" ")
        .reduce((stylesAcc, path) => {
          let style;

          if (isClassName(path)) {
            const className = getClassName(path);
            style = definition[className] || getFromCache(className, namespace);
          } else {
            style = transform(path);
          }

          stylesAcc.push(style);
          return stylesAcc;
        }, []);

      definition[key] = flattenStyles(styles);
    }
  }

  setInCache(definition, namespace);
};

const define = (definition, namespace) => {
  let definitionNamespace = namespace;

  if (!definitionNamespace) {
    namespace = Symbol();
  }

  globalDefine(definition, definitionNamespace);

  return definitionNamespace;
};

const globalUse = (path, namespace) => {
  const styles = path
    .trim()
    .split(" ")
    .reduce((stylesAcc, p) => {
      if (isFalseyString(p)) {
        return stylesAcc;
      }

      if (isClassName(p)) {
        stylesAcc.push(getFromCache(getClassName(p), namespace));
      } else {
        stylesAcc.push(transform(p));
      }

      return stylesAcc;
    }, []);

  return styles;
};

// create local cache for returned arrays, so we can avoid re-renders
const cache = Object.create(null);

// namespace should be a symbol exported from the styles
var useStyles = (nameSpace) => {
  // TODO: is concurrency safe (?) is expensive (?)
  const uid = react.useRef(Date.now().toString());

  react.useEffect(() => {
    return () => {
      cache[uid.current] = null;
    };
  }, []);

  const use = react.useCallback((strings, ...expressions) => {
    const path = strings.reduce(
      (result, currentString, i) =>
        `${result}${currentString}${expressions[i] ? expressions[i] : ""}`,
      ""
    );

    if (!cache[uid.current]) {
      cache[uid.current] = Object.create(null);
    } else if (cache[uid.current][path]) {
      return cache[uid.current][path];
    }

    const styles = globalUse(path, nameSpace);
    Object.assign(cache[uid.current], { [path]: styles });

    return styles;
  }, []);

  return use;
};

exports.define = define;
exports.globalDefine = globalDefine;
exports.globalUse = globalUse;
exports.setSeparator = setSeparator;
exports.useStyles = useStyles;
