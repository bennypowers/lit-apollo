"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCacheValueSync = getCacheValueSync;
exports.readCacheSync = readCacheSync;
exports.setCacheValueSync = setCacheValueSync;

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reads the entire cache
 */
function readCacheSync(cachePath) {
  return JSON.parse(_fs.default.readFileSync(cachePath, 'utf8'));
}
/**
 * Sets a cache value and writes the file to disk
 */


function setCacheValueSync(cachePath, key, value) {
  var originalCache;

  try {
    originalCache = readCacheSync(cachePath);
  } catch (e) {
    originalCache = {};
  }

  var newCache = _lodash.default.assign(originalCache, {
    [key]: value
  });

  _fs.default.writeFileSync(cachePath, JSON.stringify(newCache, null, '  '));

  return newCache;
}
/**
 * Gets a single value from the cache given a key
 */


function getCacheValueSync(cachePath, repoPath) {
  try {
    let cache = readCacheSync(cachePath);
    return cache[repoPath];
  } catch (e) {}
}