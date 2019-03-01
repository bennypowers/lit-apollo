import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default [
  {
    input: './rollup.input.js',
    output: {
      file: './diffable-html.js',
      format: 'es',
    },
    plugins: [
      {
        transform: (code) => {
          let result = code;
          result = result.replace("var htmlparser2 = require('htmlparser2');", "var htmlparser2Parser = require('htmlparser2/lib/Parser');");
          result = result.replace("var parser = new htmlparser2.Parser(", "var parser = new htmlparser2Parser(");
          return result;
        },
      },
      nodeResolve({ preferBuiltins: false }),
      json(),
      commonjs(),
      globals(),
      builtins()
    ],
  },
];
