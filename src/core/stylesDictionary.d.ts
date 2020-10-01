declare type StyleContent = {
  __propName: string
};

declare type StylesDictionary = {
  align: {
    content: StyleContent;
    items: StyleContent;
    self: StyleContent;
  };
  aspect: { ratio: StyleContent; };
  backface: { visibility: StyleContent; };
  background: { color: StyleContent; };
  border: {
    bottom: {
      color: StyleContent;
      end: { radius: StyleContent; };
      left: { radius: StyleContent; };
      right: { radius: StyleContent; };
      start: { radius: StyleContent; };
      width: StyleContent;
    };
    color: StyleContent;
    end: {
      color: StyleContent;
      width: StyleContent;
    };
    left: {
      color: StyleContent;
      width: StyleContent;
    };
    radius: StyleContent;
    right: {
      color: StyleContent;
      width: StyleContent;
    };
    start: {
      color: StyleContent;
      width: StyleContent;
    };
    style: StyleContent;
    top: {
      color: StyleContent;
      end: { radius: StyleContent; };
      left: { radius: StyleContent; };
      right: { radius: StyleContent; };
      start: { radius: StyleContent; };
      width: StyleContent;
    }
  };
  bottom: StyleContent;
  color: StyleContent;
  decomposed: { matrix: StyleContent; };
  direction: StyleContent;
  display: StyleContent;
  elevation: StyleContent;
  end: StyleContent;
  flex: StyleContent & {
    basis: StyleContent;
    direction: StyleContent;
    grow: StyleContent;
    shrink: StyleContent;
    wrap: StyleContent;
  };
  font: {
    family: StyleContent;
    size: StyleContent;
    style: StyleContent;
    variant: StyleContent;
    weight: StyleContent;
  };
  height: StyleContent;
  include: { font: { padding: StyleContent; } };
  justify: { content: StyleContent; };
  left: StyleContent;
  letter: { spacing: StyleContent; };
  line: { height: StyleContent; };
  margin: StyleContent & {
    bottom: StyleContent;
    end: StyleContent;
    horizontal: StyleContent;
    left: StyleContent;
    right: StyleContent;
    start: StyleContent;
    top: StyleContent;
    vertical: StyleContent;
  };
  max: {
    height: StyleContent;
    width: StyleContent;
  };
  min: {
    height: StyleContent;
    width: StyleContent;
  };
  opacity: StyleContent;
  overflow: StyleContent;
  overlay: { color: StyleContent; };
  padding: StyleContent & {
    bottom: StyleContent;
    end: StyleContent;
    horizontal: StyleContent;
    left: StyleContent;
    right: StyleContent;
    start: StyleContent;
    top: StyleContent;
    vertical: StyleContent;
  };
  postion: StyleContent;
  resize: { mode: StyleContent; };
  right: StyleContent;
  rotation: StyleContent;
  scale: {
    x: StyleContent;
    y: StyleContent;
  };
  shadow: {
    color: StyleContent;
    offset: StyleContent;
    opacity: StyleContent;
    radius: StyleContent;
  };
  start: StyleContent;
  text: {
    align: StyleContent & {
      vertical: StyleContent;
    };
    decoration: {
      color: StyleContent;
      line: StyleContent;
      style: StyleContent;
    };
    shadow: {
      color: StyleContent;
      offset: StyleContent;
      radius: StyleContent;
    };
    transform: StyleContent;
  };
  tint: { color: StyleContent; };
  top: StyleContent;
  transform: StyleContent;
  translate: {
    x: StyleContent;
    y: StyleContent;
  };
  width: StyleContent;
  z: { index: StyleContent; };
};

export default StylesDictionary;