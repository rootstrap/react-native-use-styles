/* Use cases:
  input: 'fx:dir:col'
  output: { flexDirection: 'column' }
*/
const aliases = Object.assign(Object.create(null), {
  bot: 'bottom',
  col: 'column',
  dir: 'direction',
  fx: 'flex',
  lt: 'left',
  rt: 'right',
  bg: 'background',
  txt: 'text',
  jf: 'justify',
  pd: 'padding',
  wd: 'width',
  hg: 'height',
});

export default (alias) => {
  return aliases[alias] || alias;
};
