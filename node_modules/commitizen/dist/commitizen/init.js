"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var configLoader = _interopRequireWildcard(require("./configLoader"));

var _util = require("../common/util");

var adapter = _interopRequireWildcard(require("./adapter"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let addPathToAdapterConfig = adapter.addPathToAdapterConfig,
    generateNpmInstallAdapterCommand = adapter.generateNpmInstallAdapterCommand,
    getNpmInstallStringMappings = adapter.getNpmInstallStringMappings,
    generateYarnAddAdapterCommand = adapter.generateYarnAddAdapterCommand,
    getYarnAddStringMappings = adapter.getYarnAddStringMappings;
var _default = init;
exports.default = _default;

const CLI_PATH = _path.default.normalize(_path.default.join(__dirname, '../../'));
/**
 * CZ INIT
 *
 * Init is generally responsible for initializing an adapter in
 * a user's project. The goal is to be able to run
 * `commitizen init` and be prompted for certain fields which
 * will help you install the proper adapter for your project.
 *
 * Init does not actually create the adapter (it defers to adapter
 * for this). Instead, it is specifically designed to help gather
 * and validate the information needed to install the adapter
 * properly without interfering with a previous adapter config.
 */

/**
 * The defaults for init
 */


const defaultInitOptions = {
  save: false,
  saveDev: true,
  saveExact: false,
  force: false,
  // for --yarn use
  // @see https://github.com/commitizen/cz-cli/issues/527#issuecomment-392653897
  yarn: false,
  dev: true,
  exact: false // should add trailing comma, thus next developer doesn't got blamed for this line

};
/**
 * Runs npm install for the adapter then modifies the config.commitizen as needed
 */

function init(sh, repoPath, adapterNpmName, {
  save = false,
  saveDev = true,
  saveExact = false,
  force = false,
  yarn = false,
  dev = false,
  exact = false
} = defaultInitOptions) {
  // Don't let things move forward if required args are missing
  checkRequiredArguments(sh, repoPath, adapterNpmName); // Move to the correct directory so we can run commands

  sh.cd(repoPath); // Load the current adapter config

  let adapterConfig = loadAdapterConfig(); // Get the npm string mappings based on the arguments provided

  let stringMappings = yarn ? getYarnAddStringMappings(dev, exact, force) : getNpmInstallStringMappings(save, saveDev, saveExact, force); // Generate a string that represents the npm install command

  let installAdapterCommand = yarn ? generateYarnAddAdapterCommand(stringMappings, adapterNpmName) : generateNpmInstallAdapterCommand(stringMappings, adapterNpmName); // Check for previously installed adapters

  if (adapterConfig && adapterConfig.path && adapterConfig.path.length > 0 && !force) {
    throw new Error(`A previous adapter is already configured. Use --force to override
    adapterConfig.path: ${adapterConfig.path}
    repoPath: ${repoPath}
    CLI_PATH: ${CLI_PATH}
    installAdapterCommand: ${installAdapterCommand}
    adapterNpmName: ${adapterNpmName}
    `);
  }

  try {
    (0, _util.executeShellCommand)(sh, repoPath, installAdapterCommand);
    addPathToAdapterConfig(sh, CLI_PATH, repoPath, adapterNpmName);
  } catch (e) {
    console.error(e);
  }
}
/**
 * Checks to make sure that the required arguments are passed
 * Throws an exception if any are not.
 */


function checkRequiredArguments(sh, path, adapterNpmName) {
  if (!sh) {
    throw new Error("You must pass an instance of shelljs when running init.");
  }

  if (!path) {
    throw new Error("Path is required when running init.");
  }

  if (!adapterNpmName) {
    throw new Error("The adapter's npm name is required when running init.");
  }
}
/**
 * CONFIG
 * Loads and returns the adapter config at key config.commitizen, if it exists
 */


function loadAdapterConfig() {
  let config = configLoader.load();

  if (config) {
    return config;
  } else {}
}