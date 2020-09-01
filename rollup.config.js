import pkg from './package.json';

export default {
  input: 'src/index.js',
  external: ['react', 'react-native'],
  output: [{ file: pkg.main, format: 'cjs' }],
};
