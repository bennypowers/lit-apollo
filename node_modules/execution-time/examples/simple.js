const executionTime = require('../')(console.log);
executionTime.start();
return setTimeout(() => {
  executionTime.stop();
}, 1000);