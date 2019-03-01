'use strict'
const TestRunner = require('test-runner')
const a = require('assert')
const ArgvArray = require('./').ArgvArray
const argvTools = require('./')

const runner = new TestRunner()

runner.test('argvArray.expandOptionEqualsNotation()', function () {
  const argv = new ArgvArray()
  argv.load([ '--one=1', '--two', '2', '--three=3', '4' ])
  argv.expandOptionEqualsNotation()
  a.deepEqual(argv, [
    '--one', '1', '--two', '2', '--three', '3', '4'
  ])
})

runner.test('argvArray.expandOptionEqualsNotation() 2', function () {
  const argv = new ArgvArray()
  argv.load([ '--one=tree' ])
  argv.expandOptionEqualsNotation()
  a.deepEqual(argv, [ '--one', 'tree' ])
})

runner.test('argvArray.expandGetoptNotation()', function () {
  const argv = new ArgvArray()
  argv.load([ '-abc' ])
  argv.expandGetoptNotation()
  a.deepEqual(argv.slice(), [
    '-a', '-b', '-c'
  ])
})

runner.test('argvArray.expandGetoptNotation() with values', function () {
  const argv = new ArgvArray()
  argv.load([ '-abc', '1', '-a', '2', '-bc' ])
  argv.expandGetoptNotation()
  a.deepEqual(argv, [
    '-a', '-b', '-c', '1', '-a', '2', '-b', '-c'
  ])
})

runner.test('argvArray.hasCombinedShortOptions()', function () {
  const argv = new ArgvArray()
  argv.load([ '-abc', '1', '-a', '2' ])
  a.strictEqual(argv.hasCombinedShortOptions(), true)
  argv.load([ '1', '-a', '2' ])
  a.strictEqual(argv.hasCombinedShortOptions(), false)
  argv.load([ '1', '-ab', '2' ])
  a.strictEqual(argv.hasCombinedShortOptions(), true)
})

runner.test('argvTools.isOption()', function () {
  a.strictEqual(argvTools.isOption('--yeah'), true)
  a.strictEqual(argvTools.isOption('--one-two'), true)
  a.strictEqual(argvTools.isOption('в--yeah'), false)
  a.strictEqual(argvTools.isOption('-y'), true)
  a.strictEqual(argvTools.isOption('--option=value'), false)
  a.strictEqual(argvTools.isOption('-asd'), false)
})

runner.test('argvTools.isLongOption()', function () {
  a.strictEqual(argvTools.isLongOption('--yeah'), true)
  a.strictEqual(argvTools.isLongOption('--one-two'), true)
  a.strictEqual(argvTools.isLongOption('в--yeah'), false)
  a.strictEqual(argvTools.isLongOption('-y'), false)
  a.strictEqual(argvTools.isLongOption('--option=value'), false)
  a.strictEqual(argvTools.isLongOption('-asd'), false)
})

runner.test('argvTools.getOptionName()', function () {
  a.strictEqual(argvTools.getOptionName('--yeah'), 'yeah')
  a.strictEqual(argvTools.getOptionName('--one-two'), 'one-two')
  a.strictEqual(argvTools.getOptionName('в--yeah'), null)
  a.strictEqual(argvTools.getOptionName('-y'), 'y')
  a.strictEqual(argvTools.getOptionName('--option=value'), 'option')
  a.strictEqual(argvTools.getOptionName('-asd'), null)
})
