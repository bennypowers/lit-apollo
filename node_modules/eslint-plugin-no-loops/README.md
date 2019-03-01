# eslint-plugin-no-loops
It's 2016 and you still use loops?

[![Build Status](https://travis-ci.org/buildo/eslint-plugin-no-loops.svg?branch=master)](https://travis-ci.org/buildo/eslint-plugin-no-loops)
[![npm](https://img.shields.io/npm/v/eslint-plugin-no-loops.svg)](https://www.npmjs.com/package/eslint-plugin-no-loops)

<p align="center">
  <img src="http://img.memegenerator.io/meme/160120/mr8qya.jpg" />
</p>

## Installation
```sh
npm install --save-dev eslint-plugin-no-loops
```

## Usage
In your `.eslintrc`:

```javascript
{
  "plugins": [
    "no-loops"
  ],
  "rules": {
    "no-loops/no-loops": 2
  }
}
```

## Rule
Disallow use of loops (for, for-in, while, do-while).

## Why
You [don't](http://www.codereadability.com/coding-without-loops/) [need](http://joelhooks.com/blog/2014/02/06/stop-writing-for-loops-start-using-underscorejs/) [them](http://www.sitepoint.com/quick-tip-stop-writing-loops-start-thinking-with-maps/).
