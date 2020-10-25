import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  external: ['react', 'react-native'],
  output: [{ file: `./cjs/${process.env.NODE_ENV}.js`, format: 'cjs' }],
  plugins: [
    resolve(),
    process.env.NODE_ENV === 'production' && replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
