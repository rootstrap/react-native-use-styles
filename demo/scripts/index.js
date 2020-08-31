import { namespace, globalDefine } from '../../src/index';

const { define, use } = namespace('namespace');

globalDefine('fx-dir-col', 'col');

define('fx-dir-row', 'row');

define({
  color: 'red'
}, 'color');

define('.col .row .color', 'classname4');

const styles = use('.classname4 fx-1');

console.log(styles);