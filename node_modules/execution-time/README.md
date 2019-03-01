# execution-time

[![Build Status](https://travis-ci.org/svenkatreddy/execution-time.svg?branch=master)](https://travis-ci.org/svenkatreddy/execution-time)

[![NPM](https://nodei.co/npm/execution-time.png?stars=true)](https://nodei.co/npm/execution-time/)

node.js utility to measure execution time in code

## Install
```
npm install execution-time --save
```

## Usage
```
const perf = require('execution-time')();

//at beginning of your code
perf.start();

//at end of your code
const results = perf.stop();
console.log(results.time);  // in milliseconds
```

### Named performance measurer
```
const perf = require('execution-time')();

//at beginning of your code, pass any name
perf.start('apiCall');

//at end of your code, pass the same name (anywhere in your flow)
const results = perf.stop('apiCall');
console.log(results.time);  // in milliseconds

```

### if you dont care about results but just want to print results

sample usage with debug
```
const debug = require('debug')('your-module');
const perf = require('execution-time')(debug);

//at beginning of your code
perf.start();

//at end of your code
perf.stop();

```

also works with console.log/info/warn

```
const perf = require('execution-time')(console.log);

//at beginning of your code
perf.start();

//at end of your code
perf.stop();

```