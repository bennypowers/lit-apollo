var os = require('os');
var fs = require('fs');
var path = require('path');
var programFiles = os.arch() === "x64" ? process.env["ProgramFiles(x86)"] : process.env.ProgramFiles;
var cwd = path.dirname(programFiles);
var appData = appData || process.env.APPDATA;

module.exports = {
  chrome: {
    defaultLocation: altPaths('Google', 'Chrome', 'Application', 'chrome.exe') ,
    pathQuery: 'dir /s /b chrome.exe',
    cwd: cwd,
    opensTab: true
  },
  canary: {
    defaultLocation: altPaths('Google', 'Chrome SxS', 'Application', 'chrome.exe')
  },
  firefox: {
    defaultLocation: path.join(programFiles, 'Mozilla Firefox', 'firefox.exe'),
    pathQuery: 'dir /s /b firefox.exe',
    cwd: cwd,
    opensTab: true
  },
  aurora: {
    defaultLocation: path.join(programFiles, 'Aurora', 'firefox.exe'),
    opensTab: true
  },
  opera: {
    defaultLocation: path.join(programFiles, 'Opera', 'launcher.exe'),
    pathQuery: 'dir /s /b opera.exe',
    cwd: cwd,
    imageName: 'opera.exe',
    opensTab: true
  },
  ie: {
    defaultLocation: path.join(programFiles, 'Internet Explorer', 'iexplore.exe'),
    pathQuery: 'dir /s /b iexplore.exe',
    cwd: cwd
  },
  edge: {
    defaultLocation: path.join(getEdgeDirectory(), 'MicrosoftEdge.exe'),
    getCommand: function(browser, url) {
      return 'start /wait microsoft-edge:' + url;
    },
    opensTab: true,
    cwd: cwd
  },
  electron: {
    defaultLocation: path.join(process.cwd(), 'node_modules', '.bin', 'electron'),
    pathQuery: 'dir /s /b electron.exe',
    args: [path.join(__dirname, '..', '..', '..', 'resources', 'electron.js')],
    multi: true,
    cwd: cwd
  },
  phantom: {
    defaultLocation: [
      path.join(process.cwd(), 'node_modules', '.bin', 'phantomjs'),
      path.join(programFiles, 'phantomjs', 'phantomjs.exe')
    ],
    pathQuery: 'dir /s /b phantomjs.exe',
    args: [path.join(__dirname, '..', '..', '..', 'resources', 'phantom.js')],
    multi: true,
    cwd: cwd
  },
  nodeWebkit: {
    pathQuery: 'dir /s /b nw.exe',
    multi: true,
    cwd: cwd,
    imageName: 'nw.exe',
    getCommand: function(browser, url) {
      var app = process.cwd();
      return '"' + browser.command + '" ' + app + ' --url="' + url + '"';
    }
  }
};

function altPaths() {
  var args = Array.prototype.slice.call(arguments);
  return [
    path.join.apply(path, [programFiles].concat(args)),
    path.join.apply(path, [appData].concat(args))
  ];
}

function getEdgeDirectory() {
  var windowsDirectory = process.env.winDir;
  var systemApps = path.join(windowsDirectory, 'SystemApps');

  try {
    return fs.readdirSync(systemApps).filter(function(folder) {
        return folder.startsWith('Microsoft.MicrosoftEdge');
      }).map(function(folder) {
        return path.join(systemApps, folder);
      })[0];
  } catch(ex) {
    return systemApps;
  }
}
