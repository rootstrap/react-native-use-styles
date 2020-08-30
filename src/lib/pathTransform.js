// TODO: transform numbers from path's string
// TODO: separator could be changed by configuration (?)
import stylesDictionary from "./stylesDictionary";
import aliasesDictionary from "./aliasesDictionary";

export const SEPARATOR = "-";

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

  return [value, newPos];
};

// PRECONDITION: at least one key-value pair exists in the path
/* Use cases:
  input: "fx-1" // Done
  output:
  {
    flex: 1
  }

  input: "fx-1-2" // Done
  output:
  {
    flex: 1 2
  }

  input: "fx-dir-row" // Done
  output:
  {
    flexDirection: 'row'
  }

  input: "fx-1-2-dir-row"
  output:
  {
    flex: 1 2,
    flexDirection: row
  }
*/
export default (path) => {
  let style = Object.create(null);
  const parts = path.split(SEPARATOR);

  // iterates until find a value, then iterates until find another key or until end
  let currentNode = getKeyFromParts(stylesDictionary, parts, 0);
  let pos = 1;
  while (pos < parts.length) {
    const lastNode = currentNode;
    currentNode = getKeyFromParts(currentNode, parts, pos);

    // if it's an object we need to keep digging
    // otherwise is undefined cause we found a value
    if (!currentNode) {
      const [value, newPos] = getValueFromParts(parts, pos, style);
      pos = newPos;

      Object.assign(style, {
        [lastNode.__propName]: value,
      });
    }

    pos += 1;
  }

  return style;
};
