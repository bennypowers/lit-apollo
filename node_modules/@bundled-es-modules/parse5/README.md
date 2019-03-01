# parse5

This is a mirror of [parse5](https://www.npmjs.com/package/parse5), bundled and exposed as ES module.

## Install

```
npm install @bundled-es-modules/parse5
bower install bundled-es-modules/parse5
```

## Use

```html
<script type="module">
  // from main file
  import { parse, parseFragment, serialize } from 'parse5';
  // or directly
  import { parse, parseFragment, serialize } from 'parse5/parse5.js';
  console.log(parse, parseFragment, serialize);
</script>
```

Make sure you added `@bundled-es-modules` scope to the path if used via npm.
