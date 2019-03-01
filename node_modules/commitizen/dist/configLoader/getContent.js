"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _stripJsonComments = _interopRequireDefault(require("strip-json-comments"));

var _isUtf = _interopRequireDefault(require("is-utf8"));

var _stripBom = _interopRequireDefault(require("strip-bom"));

var _configLoader = require("../configLoader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = getConfigContent;
/**
 * Read the content of a configuration file
 * - if not js or json: strip any comments
 * - if js or json: require it
 * @param {String} configPath - full path to configuration file
 * @return {Object}
 */

exports.default = _default;

function readConfigContent(configPath) {
  const parsedPath = _path.default.parse(configPath);

  const isRcFile = parsedPath.ext !== '.js' && parsedPath.ext !== '.json';
  const jsonString = readConfigFileContent(configPath);
  const parse = isRcFile ? contents => JSON.parse((0, _stripJsonComments.default)(contents)) : contents => JSON.parse(contents);

  try {
    const parsed = parse(jsonString);
    Object.defineProperty(parsed, 'configPath', {
      value: configPath
    });
    return parsed;
  } catch (error) {
    error.message = [`Parsing JSON at ${configPath} for commitizen config failed:`, error.mesasge].join('\n');
    throw error;
  }
}
/**
 * Get content of the configuration file
 * @param {String} configPath - partial path to configuration file
 * @param {String} directory - directory path which will be joined with config argument
 * @return {Object}
 */


function getConfigContent(configPath, baseDirectory) {
  if (!configPath) {
    return;
  }

  const resolvedPath = _path.default.resolve(baseDirectory, configPath);

  const configBasename = _path.default.basename(resolvedPath);

  if (!_fs.default.existsSync(resolvedPath)) {
    return (0, _configLoader.getNormalizedConfig)(resolvedPath);
  }

  const content = readConfigContent(resolvedPath);
  return (0, _configLoader.getNormalizedConfig)(configBasename, content);
}

;
/**
 * Read proper content from config file.
 * If the chartset of the config file is not utf-8, one error will be thrown.
 * @param {String} configPath
 * @return {String}
 */

function readConfigFileContent(configPath) {
  let rawBufContent = _fs.default.readFileSync(configPath);

  if (!(0, _isUtf.default)(rawBufContent)) {
    throw new Error(`The config file at "${configPath}" contains invalid charset, expect utf8`);
  }

  return (0, _stripBom.default)(rawBufContent.toString("utf8"));
}