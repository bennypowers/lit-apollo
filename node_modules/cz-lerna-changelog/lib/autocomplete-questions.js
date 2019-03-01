'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (questions) {
  return questions.map(function (question) {
    return Object.assign(question, question.type === 'autocomplete' ? {
      source: autoCompleteSource(question.choices)
    } : {});
  });
};

function autoCompleteSource(options) {
  return function (answersSoFar, input) {
    return new Promise(function (resolve) {
      var matches = options.filter(function (_ref) {
        var name = _ref.name;
        return !input || name.toLowerCase().indexOf(input.toLowerCase()) === 0;
      });
      resolve(matches);
    });
  };
}