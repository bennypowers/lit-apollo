"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
const reShortMessage = /^-([a-zA-Z]*)m(.*)$/;
const reLongMessage = /^--message(=.*)?$/;
/**
 * Strip message declaration from git arguments
 */

function parse(rawGitArgs) {
  let result = [];
  let skipNext = false;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = rawGitArgs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      const arg = _step.value;
      let match;

      if (skipNext) {
        skipNext = false;
        continue;
      }

      match = reShortMessage.exec(arg);

      if (match) {
        if (match[1]) {
          result.push(`-${match[1]}`);
        }

        if (!match[2]) {
          skipNext = true;
        }

        continue;
      }

      match = reLongMessage.exec(arg);

      if (match) {
        if (!match[1]) {
          skipNext = true;
        }

        continue;
      }

      result.push(arg);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}