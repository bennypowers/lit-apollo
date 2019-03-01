import commonjs from 'rollup-plugin-commonjs';

export default [
  {
    input: './node_modules/parse5/lib/index.js',
    output: {
      file: './parse5.js',
      format: 'es',
    },
    plugins: [
      commonjs(),
    ],
  },
];
