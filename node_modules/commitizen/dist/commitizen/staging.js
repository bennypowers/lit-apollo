"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isClean = isClean;

var _child_process = require("child_process");

/**
 * Asynchrounously determines if the staging area is clean
 */
function isClean(repoPath, done) {
  (0, _child_process.exec)('git diff --no-ext-diff --name-only && git diff --no-ext-diff --cached --name-only', {
    maxBuffer: Infinity,
    cwd: repoPath || process.cwd()
  }, function (error, stdout) {
    if (error) {
      return done(error);
    }

    let output = stdout || '';
    done(null, output.trim().length === 0);
  });
}