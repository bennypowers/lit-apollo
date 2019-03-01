"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _glob = _interopRequireDefault(require("glob"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = findup; // Before, "findup-sync" package was used,
// but it does not provide filter callback

exports.default = _default;

function findup(patterns, options, fn) {
  /* jshint -W083 */
  var lastpath;
  var file;
  options = Object.create(options);
  options.maxDepth = 1;
  options.cwd = _path.default.resolve(options.cwd);

  do {
    file = patterns.filter(function (pattern) {
      var configPath = _glob.default.sync(pattern, options)[0];

      if (configPath) {
        return fn(_path.default.join(options.cwd, configPath));
      }
    })[0];

    if (file) {
      return _path.default.join(options.cwd, file);
    }

    lastpath = options.cwd;
    options.cwd = _path.default.resolve(options.cwd, '..');
  } while (options.cwd !== lastpath);
}