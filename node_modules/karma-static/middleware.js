'use strict';

exports.default = karmaStatic;

var _serveStatic = require('serve-static');

function karmaStatic(config) {
  var path = config.static.path;
  if (!path) {
    return function (req, res, next) {
      next();
    };
  }
  return _serveStatic(path);
}
module.exports = exports['default'];