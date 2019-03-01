"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _configLoader = require("../configLoader");

var _util = require("../common/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = loader;
/**
 * Command line config helpers
 * Shamelessly ripped from with slight modifications:
 * https://github.com/jscs-dev/node-jscs/blob/master/lib/cli-config.js
 */

/**
 * Get content of the configuration file
 * @param {String} config - partial path to configuration file
 * @param {String} [cwd = process.cwd()] - directory path which will be joined with config argument
 * @return {Object|undefined}
 */

exports.default = _default;

function loader(configs, config, cwd) {
  var content;
  var directory = cwd || process.cwd(); // If config option is given, attempt to load it

  if (config) {
    return (0, _configLoader.getContent)(config, directory);
  }

  content = (0, _configLoader.getContent)((0, _configLoader.findup)(configs, {
    nocase: true,
    cwd: directory
  }, function (configPath) {
    if (_path.default.basename(configPath) === 'package.json') {// return !!this.getContent(configPath);
    }

    return true;
  }));

  if (content) {
    return content;
  }
  /* istanbul ignore if */


  if (!(0, _util.isInTest)()) {
    // Try to load standard configs from home dir
    var directoryArr = [process.env.USERPROFILE, process.env.HOMEPATH, process.env.HOME];

    for (var i = 0, dirLen = directoryArr.length; i < dirLen; i++) {
      if (!directoryArr[i]) {
        continue;
      }

      for (var j = 0, len = configs.length; j < len; j++) {
        content = (0, _configLoader.getContent)(configs[j], directoryArr[i]);

        if (content) {
          return content;
        }
      }
    }
  }
}