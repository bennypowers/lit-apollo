#!/usr/bin/env node
'use strict';
var logSymbols = require('log-symbols');
var meow = require('meow');
var validate = require('./');

var cli = meow([
	'Usage',
	'  $ validate-element-name <element-name>',
	'',
	'Example',
	'  $ validate-element-name s-slider',
	'  ' + logSymbols.success + ' Valid element name.'
]);

if (cli.input.length === 0) {
	console.error('Specify an element name');
	process.exit(1);
}

var res = validate(cli.input[0]);

if (res.isValid) {
	if (res.message) {
		console.log(logSymbols.success + ' Valid element name, but...');
		console.log(logSymbols.warning + ' ' + res.message);
	} else {
		console.log(logSymbols.success + ' Valid element name.');
	}
} else {
	console.error(logSymbols.error + ' ' + res.message);
}
