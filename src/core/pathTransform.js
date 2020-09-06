import stylesDictionary from "./stylesDictionary";
import aliasesDictionary from "./aliasesDictionary";
import { isConstant } from "./utils";

export let separator = ":";

const getKeyFromParts = (node, parts, pos) => {
  let currentPart = parts[pos];
  currentPart = aliasesDictionary[currentPart] || currentPart;

  return node[currentPart];
};

const getValueFromParts = (parts, pos, getConstant) => {
  let newPos = pos;
  let value = "";

  while (newPos < parts.length) {
    let newValue = parts[newPos];

    if (isConstant(newValue)) {
      newValue = getConstant(newValue);
    } else {
      newValue = aliasesDictionary[newValue] || newValue;
    }

    value += ` ${newValue}`;
    newPos += 1;
  }
  value = value.substring(1);
  if (value.indexOf(" ") === -1) {
    value = parseFloat(value) || value;
  }

  return [value, newPos];
};

// PRECONDITION: at least one key-value pair exists in the path
/* TODO: Use case:
  input: "fx:1:2:dir:row"
  output:
  {
    flex: 1 2,
    flexDirection: row
  }
*/
export default (path, getConstant) => {
  let style = Object.create(null);
  const parts = path.split(separator);

  // iterates until find a value, then get values until end
  let currentNode = getKeyFromParts(stylesDictionary, parts, 0);
  let pos = 1;
  while (pos < parts.length) {
    const lastNode = currentNode;
    currentNode = getKeyFromParts(currentNode, parts, pos);

    // if it's an object we need to keep digging, otherwise is undefined cause we found a value
    if (!currentNode) {
      const [value, newPos] = getValueFromParts(parts, pos, getConstant);
      pos = newPos;

      Object.assign(style, {
        [lastNode.__propName]: value
      });
    }

    pos += 1;
  }

  return style;
};

export const setSeparator = sp => {
  separator = sp;
};
