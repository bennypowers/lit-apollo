import commonjs from 'rollup-plugin-commonjs';

export default [
  {
    input: './node_modules/chai/chai.js',
    output: {
      file: './chai.js',
      format: 'es',
    },
    plugins: [
      commonjs(),
    ],
  },
];
