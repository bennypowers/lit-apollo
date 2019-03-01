"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;

var _configLoader = require("../configLoader");

// Configuration sources in priority order.
var configs = ['.czrc', '.cz.json', 'package.json'];

function load(config, cwd) {
  return (0, _configLoader.loader)(configs, config, cwd);
}