const { BABEL_ENV, NODE_ENV } = process.env;
const modules = BABEL_ENV === 'cjs' || NODE_ENV === 'test' ? 'commonjs' : false;

module.exports = {
  presets: [
    ['env', {
      targets: {
        browsers: 'last 2 versions',
      },
      modules
    }],
    'stage-1',
  ],
  plugins: ['transform-flow-strip-types'],
};
