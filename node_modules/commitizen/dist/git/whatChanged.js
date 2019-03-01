"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whatChanged = whatChanged;

var _child_process = require("child_process");

/**
 * Asynchronously gets the git whatchanged output
 */
function whatChanged(repoPath, done) {
  (0, _child_process.exec)('git whatchanged', {
    maxBuffer: Infinity,
    cwd: repoPath
  }, function (error, stdout, stderr) {
    if (error) {
      throw error;
    }

    done(stdout);
  });
}