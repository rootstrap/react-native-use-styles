import replace from '@rollup/plugin-replace';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  external: ['react', 'react-native'],
  output: [{ file: pkg.main, format: 'cjs' }],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
