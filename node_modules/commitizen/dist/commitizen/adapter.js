"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPathToAdapterConfig = addPathToAdapterConfig;
exports.getNearestNodeModulesDirectory = getNearestNodeModulesDirectory;
exports.getNearestProjectRootDirectory = getNearestProjectRootDirectory;
exports.getNpmInstallStringMappings = getNpmInstallStringMappings;
exports.getPrompter = getPrompter;
exports.generateNpmInstallAdapterCommand = generateNpmInstallAdapterCommand;
exports.resolveAdapterPath = resolveAdapterPath;
exports.getYarnAddStringMappings = getYarnAddStringMappings;
exports.generateYarnAddAdapterCommand = generateYarnAddAdapterCommand;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _findNodeModules = _interopRequireDefault(require("find-node-modules"));

var _lodash = _interopRequireDefault(require("lodash"));

var _detectIndent = _interopRequireDefault(require("detect-indent"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _util = require("../common/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ADAPTER
 *
 * Adapter is generally responsible for actually installing adapters to an
 * end user's project. It does not perform checks to determine if there is
 * a previous commitizen adapter installed or if the proper fields were
 * provided. It defers that responsibility to init.
 */

/**
 * Modifies the package.json, sets config.commitizen.path to the path of the adapter
 * Must be passed an absolute path to the cli's root
 */
function addPathToAdapterConfig(sh, cliPath, repoPath, adapterNpmName) {
  let commitizenAdapterConfig = {
    config: {
      commitizen: {
        path: `./node_modules/${adapterNpmName}`
      }
    }
  };

  let packageJsonPath = _path.default.join(getNearestProjectRootDirectory(), 'package.json');

  let packageJsonString = _fs.default.readFileSync(packageJsonPath, 'utf-8'); // tries to detect the indentation and falls back to a default if it can't


  let indent = (0, _detectIndent.default)(packageJsonString).indent || '  ';
  let packageJsonContent = JSON.parse(packageJsonString);
  let newPackageJsonContent = '';

  if (_lodash.default.get(packageJsonContent, 'config.commitizen.path') !== adapterNpmName) {
    newPackageJsonContent = _lodash.default.merge(packageJsonContent, commitizenAdapterConfig);
  }

  _fs.default.writeFileSync(packageJsonPath, JSON.stringify(newPackageJsonContent, null, indent) + '\n');
}
/**
 * Generates an npm install command given a map of strings and a package name
 */


function generateNpmInstallAdapterCommand(stringMappings, adapterNpmName) {
  // Start with an initial npm install command
  let installAdapterCommand = `npm install ${adapterNpmName}`; // Append the neccesary arguments to it based on user preferences

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = stringMappings.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      let value = _step.value;

      if (value) {
        installAdapterCommand = installAdapterCommand + ' ' + value;
      }
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

  return installAdapterCommand;
}
/**
 * Generates an yarn add command given a map of strings and a package name
 */


function generateYarnAddAdapterCommand(stringMappings, adapterNpmName) {
  // Start with an initial yarn add command
  let installAdapterCommand = `yarn add ${adapterNpmName}`; // Append the necessary arguments to it based on user preferences

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = stringMappings.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      let value = _step2.value;

      if (value) {
        installAdapterCommand = installAdapterCommand + ' ' + value;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return installAdapterCommand;
}
/**
 * Gets the nearest npm_modules directory
 */


function getNearestNodeModulesDirectory(options) {
  // Get the nearest node_modules directories to the current working directory
  let nodeModulesDirectories = (0, _findNodeModules.default)(options); // Make sure we find a node_modules folder

  /* istanbul ignore else */

  if (nodeModulesDirectories && nodeModulesDirectories.length > 0) {
    return nodeModulesDirectories[0];
  } else {
    console.error(`Error: Could not locate node_modules in your project's root directory. Did you forget to npm init or npm install?`);
  }
}
/**
 * Gets the nearest project root directory
 */


function getNearestProjectRootDirectory(options) {
  return _path.default.join(process.cwd(), getNearestNodeModulesDirectory(options), '/../');
}
/**
 * Gets a map of arguments where the value is the corresponding npm strings
 */


function getNpmInstallStringMappings(save, saveDev, saveExact, force) {
  return new Map().set('save', save && !saveDev ? '--save' : undefined).set('saveDev', saveDev ? '--save-dev' : undefined).set('saveExact', saveExact ? '--save-exact' : undefined).set('force', force ? '--force' : undefined);
}
/**
 * Gets a map of arguments where the value is the corresponding yarn strings
 */


function getYarnAddStringMappings(dev, exact, force) {
  return new Map().set('dev', dev ? '--dev' : undefined).set('exact', exact ? '--exact' : undefined).set('force', force ? '--force' : undefined);
}
/**
 * Gets the prompter from an adapter given an adapter path
 */


function getPrompter(adapterPath) {
  // Resolve the adapter path
  let resolvedAdapterPath = resolveAdapterPath(adapterPath); // Load the adapter

  let adapter = require(resolvedAdapterPath);
  /* istanbul ignore next */


  if (adapter && adapter.prompter && (0, _util.isFunction)(adapter.prompter)) {
    return adapter.prompter;
  } else if (adapter && adapter.default && adapter.default.prompter && (0, _util.isFunction)(adapter.default.prompter)) {
    return adapter.default.prompter;
  } else {
    throw new Error(`Could not find prompter method in the provided adapter module: ${adapterPath}`);
  }
}
/**
 * Given a resolvable module name or path, which can be a directory or file, will
 * return a located adapter path or will throw.
 */


function resolveAdapterPath(inboundAdapterPath) {
  // Check if inboundAdapterPath is a path or node module name
  let parsed = _path.default.parse(inboundAdapterPath);

  let isPath = parsed.dir.length > 0 && parsed.dir.charAt(0) !== "@"; // Resolve from the root of the git repo if inboundAdapterPath is a path

  let absoluteAdapterPath = isPath ? _path.default.resolve(getGitRootPath(), inboundAdapterPath) : inboundAdapterPath;

  try {
    // try to resolve the given path
    return require.resolve(absoluteAdapterPath);
  } catch (error) {
    error.message = "Could not resolve " + absoluteAdapterPath + ". " + error.message;
    throw error;
  }
}

function getGitRootPath() {
  return _shelljs.default.exec('git rev-parse --show-toplevel', {
    silent: true
  }).stdout.trim();
}