const fs = require("fs");

module.exports = async path =>
  new Promise(resolve => fs.stat(path, err => resolve(!err)));
