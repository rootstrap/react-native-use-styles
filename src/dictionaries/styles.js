// SOURCE: https://github.com/facebook/react-native/blob/d2045411f5771a8c7275c1388179fef3892e9f53/Libraries/Components/View/ReactNativeViewViewConfig.js
// TODO: remove prototype from inner objects (?)
export default Object.assign(Object.create(null), {
  align: {
    content: { __propName: 'alignContent' },
    items: { __propName: 'alignItems' },
    self: { __propName: 'alignSelf' },
  },
  aspect: { ratio: { __propName: 'aspectRatio' } },
  backface: { visibility: { __propName: 'backfaceVisibility' } },
  background: { color: { __propName: 'backgroundColor' } },
  border: {
    bottom: {
      color: { __propName: 'borderBottomColor' },
      end: { radius: { __propName: 'borderBottomEndRadius' } },
      left: { radius: { __propName: 'borderBottomLeftRadius' } },
      right: { radius: { __propName: 'borderBottomRightRadius' } },
      start: { radius: { __propName: 'borderBottomStartRadius' } },
      width: { __propName: 'borderBottomWidth' },
    },
    color: { __propName: 'borderColor' },
    end: {
      color: { __propName: 'borderEndColor' },
      width: { __propName: 'borderEndWidth' },
    },
    left: {
      color: { __propName: 'borderLeftColor' },
      width: { __propName: 'borderLeftWidth' },
    },
    radius: { __propName: 'borderRadius' },
    right: {
      color: { __propName: 'borderRightColor' },
      width: { __propName: 'borderRightWidth' },
    },
    start: {
      color: { __propName: 'borderStartColor' },
      width: { __propName: 'borderStartWidth' },
    },
    style: { __propName: 'borderStyle' },
    top: {
      color: { __propName: 'borderTopColor' },
      end: { radius: { __propName: 'borderTopEndRadius' } },
      left: { radius: { __propName: 'borderTopLeftRadius' } },
      right: { radius: { __propName: 'borderTopRightRadius' } },
      start: { radius: { __propName: 'borderTopStartRadius' } },
      width: { __propName: 'borderTopWidth' },
    },
  },
  bottom: { __propName: 'bottom' },
  color: { __propName: 'color' },
  decomposed: { matrix: { __propName: 'decomposedMatrix' } },
  direction: { __propName: 'direction' },
  display: { __propName: 'display' },
  elevation: { __propName: 'elevation' },
  end: { __propName: 'end' },
  flex: {
    __propName: 'flex',
    basis: { __propName: 'flexBasis' },
    direction: { __propName: 'flexDirection' },
    grow: { __propName: 'flexGrow' },
    shrink: { __propName: 'flexShrink' },
    wrap: { __propName: 'flexWrap' },
  },
  font: {
    family: { __propName: 'fontFamily' },
    size: { __propName: 'fontSize' },
    style: { __propName: 'fontStyle' },
    variant: { __propName: 'fontVariant' },
    weight: { __propName: 'fontWeight' },
  },
  height: { __propName: 'height' },
  include: { font: { padding: { __propName: 'includeFontPadding' } } },
  justify: { content: { __propName: 'justifyContent' } },
  left: { __propName: 'left' },
  letter: { spacing: { __propName: 'letterSpacing' } },
  line: { height: { __propName: 'lineHeight' } },
  margin: {
    __propName: 'margin',
    bottom: { __propName: 'marginBottom' },
    end: { __propName: 'marginEnd' },
    horizontal: { __propName: 'marginHorizontal' },
    left: { __propName: 'marginLeft' },
    right: { __propName: 'marginRight' },
    start: { __propName: 'marginStart' },
    top: { __propName: 'marginTop' },
    vertical: { __propName: 'marginVertical' },
  },
  max: {
    height: { __propName: 'maxHeight' },
    width: { __propName: 'maxWidth' },
  },
  min: {
    height: { __propName: 'minHeight' },
    width: { __propName: 'minWidth' },
  },
  opacity: { __propName: 'opacity' },
  overflow: { __propName: 'overflow' },
  overlay: { color: { __propName: 'overlayColor' } },
  padding: {
    __propName: 'padding',
    bottom: { __propName: 'paddingBottom' },
    end: { __propName: 'paddingEnd' },
    horizontal: { __propName: 'paddingHorizontal' },
    left: { __propName: 'paddingLeft' },
    right: { __propName: 'paddingRight' },
    start: { __propName: 'paddingStart' },
    top: { __propName: 'paddingTop' },
    vertical: { __propName: 'paddingVertical' },
  },
  postion: { __propName: 'position' },
  resize: { mode: { __propName: 'resizeMode' } },
  right: { __propName: 'right' },
  rotation: { __propName: 'rotation' },
  scale: {
    x: { __propName: 'scaleX' },
    y: { __propName: 'scaleY' },
  },
  shadow: {
    color: { __propName: 'shadowColor' },
    offset: { __propName: 'shadowOffset' },
    opacity: { __propName: 'shadowOpacity' },
    radius: { __propName: 'shadowRadius' },
  },
  start: { __propName: 'start' },
  text: {
    align: {
      __propName: 'textAlign',
      vertical: { __propName: 'textAlignVertical' },
    },
    decoration: {
      color: { __propName: 'textDecorationColor' },
      line: { __propName: 'textDecorationLine' },
      style: { __propName: 'textDecorationStyle' },
    },
    shadow: {
      color: { __propName: 'textShadowColor' },
      offset: { __propName: 'textShadowOffset' },
      radius: { __propName: 'textShadowRadius' },
    },
    transform: { __propName: 'textTransform' },
  },
  tint: { color: { __propName: 'tintColor' } },
  top: { __propName: 'top' },
  transform: { __propName: 'transform' }, //TODO: not supported, not primitive value, this receives an array
  translate: {
    x: { __propName: 'translateX' },
    y: { __propName: 'translateY' },
  },
  width: { __propName: 'width' },
  z: { index: { __propName: 'zIndex' } },
});
