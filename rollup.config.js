import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  external: ['react', 'react-native'],
  output: [{ file: pkg.main, format: 'cjs' }],
  plugins: [
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
