'use strict';

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commitAnalyzer = require('@semantic-release/commit-analyzer');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _buildCommit = require('cz-customizable/buildCommit');

var _buildCommit2 = _interopRequireDefault(_buildCommit);

var _inquirerAutocompletePrompt = require('inquirer-autocomplete-prompt');

var _inquirerAutocompletePrompt2 = _interopRequireDefault(_inquirerAutocompletePrompt);

var _makeDefaultQuestions = require('./make-default-questions');

var _makeDefaultQuestions2 = _interopRequireDefault(_makeDefaultQuestions);

var _autocompleteQuestions = require('./autocomplete-questions');

var _autocompleteQuestions2 = _interopRequireDefault(_autocompleteQuestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require("@lerna/project"),
    getPackages = _require.getPackages;

var commitAnalyzer = function commitAnalyzer(props, commits, then) {
  return (0, _commitAnalyzer.analyzeCommits)(props, commits).then(function (result) {
    return then(null, result);
  }).catch(then);
};

function getAllPackages() {
  return getPackages();
}

function getChangedPackages(allPackages) {
  var changedFiles = _shelljs2.default.exec('git diff --cached --name-only', { silent: true }).stdout.split('\n');

  return allPackages.filter(function (pkg) {
    var packagePrefix = _path2.default.relative('.', pkg.location) + _path2.default.sep;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = changedFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var changedFile = _step.value;

        if (changedFile.indexOf(packagePrefix) === 0) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }).map(function (pkg) {
    return pkg.name;
  });
}

function makeAffectsLine(answers) {
  var selectedPackages = answers.packages;
  if (selectedPackages && selectedPackages.length) {
    return 'affects: ' + selectedPackages.join(', ');
  }
}

function getCommitTypeMessage(type) {
  if (!type) {
    return 'This commit does not indicate any release';
  }
  return {
    patch: '🛠  This commit indicates a patch release (0.0.X)',
    minor: '✨  This commit indicates a minor release (0.X.0)',
    major: '💥  This commit indicates a major release (X.0.0)'
  }[type];
}

function mergeQuestions(defaultQuestions, customQuestions) {
  var questions = [];
  defaultQuestions.forEach(function (question) {
    var matchingCustomQuestions = customQuestions.filter(function (_ref) {
      var customQuestionName = _ref.name;
      return customQuestionName === question.name;
    });
    var customQuestion = matchingCustomQuestions.length > 0 && matchingCustomQuestions[0];
    questions.push(customQuestion || question);
  });
  return questions;
}

function makePrompter() {
  var makeCustomQuestions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    return [];
  };

  return function (cz, commit) {
    getAllPackages().then(function (pkgs) {
      var allPackages = pkgs.map(function (pkg) {
        return pkg.name;
      });
      var changedPackages = getChangedPackages(pkgs);

      var defaultQuestions = (0, _makeDefaultQuestions2.default)(allPackages, changedPackages);
      var customQuestions = makeCustomQuestions(allPackages, changedPackages);
      var questions = mergeQuestions(defaultQuestions, customQuestions);

      console.log('\n\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n');

      cz.registerPrompt('autocomplete', _inquirerAutocompletePrompt2.default);
      cz.prompt((0, _autocompleteQuestions2.default)(questions)).then(function (answers) {
        var affectsLine = makeAffectsLine(answers);
        if (affectsLine) {
          answers.body = affectsLine + '\n' + answers.body;
        }
        var message = (0, _buildCommit2.default)(answers);
        var type = commitAnalyzer({}, {
          commits: [{
            hash: '',
            message: message
          }]
        }, function (err, type) {
          console.log(_chalk2.default.green('\n' + getCommitTypeMessage(type) + '\n'));
          console.log('\n\nCommit message:');
          console.log(_chalk2.default.blue('\n\n' + message + '\n'));
          commit(message);
        });
      });
    });
  };
}

module.exports = {
  prompter: makePrompter(),
  makePrompter: makePrompter
};