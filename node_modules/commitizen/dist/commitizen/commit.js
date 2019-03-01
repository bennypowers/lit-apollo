"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _cachedir = _interopRequireDefault(require("cachedir"));

var _fsExtra = require("fs-extra");

var _git = require("../git");

var cache = _interopRequireWildcard(require("./cache"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = commit;
/**
 * Takes all of the final inputs needed in order to make dispatch a git commit
 */

exports.default = _default;

function dispatchGitCommit(sh, repoPath, template, options, overrideOptions, done) {
  // Commit the user input -- side effect that we'll test
  (0, _git.commit)(sh, repoPath, template, _objectSpread({}, options, overrideOptions), function (error) {
    done(error, template);
  });
}
/**
 * Asynchronously commits files using commitizen
 */


function commit(sh, inquirer, repoPath, prompter, options, done) {
  var cacheDirectory = (0, _cachedir.default)('commitizen');

  var cachePath = _path.default.join(cacheDirectory, 'commitizen.json');

  (0, _fsExtra.ensureDir)(cacheDirectory, function (error) {
    if (error) {
      console.error("Couldn't create commitizen cache directory: ", error); // TODO: properly handle error?
    } else {
      if (options.retryLastCommit) {
        console.log('Retrying last commit attempt.'); // We want to use the last commit instead of the current commit,
        // so lets override some options using the values from cache.

        let _cache$getCacheValueS = cache.getCacheValueSync(cachePath, repoPath),
            retryOptions = _cache$getCacheValueS.options,
            retryOverrideOptions = _cache$getCacheValueS.overrideOptions,
            retryTemplate = _cache$getCacheValueS.template;

        dispatchGitCommit(sh, repoPath, retryTemplate, retryOptions, retryOverrideOptions, done);
      } else {
        // Get user input -- side effect that is hard to test
        prompter(inquirer, function (error, template, overrideOptions) {
          // Allow adapters to error out
          // (error: Error?, template: String, overrideOptions: Object)
          if (!(error instanceof Error)) {
            overrideOptions = template;
            template = error;
            error = null;
          }

          if (error) {
            return done(error);
          } // We don't want to add retries to the cache, only actual commands


          cache.setCacheValueSync(cachePath, repoPath, {
            template,
            options,
            overrideOptions
          });
          dispatchGitCommit(sh, repoPath, template, options, overrideOptions, done);
        });
      }
    }
  });
}