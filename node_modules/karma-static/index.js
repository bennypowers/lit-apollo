'use strict';

var _middleware = require('./middleware');

exports.default = {
  'middleware:static': ['factory', _middleware]
};
module.exports = exports['default'];