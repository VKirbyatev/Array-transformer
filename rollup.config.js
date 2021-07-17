export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.cjs',
    format: 'cjs',
    esModule: false,
    interop: false,
    sourcemap: true,
    preferConst: true,
    exports: 'named',
  },
};
