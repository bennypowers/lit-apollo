const executionTime = require('../')(console.log);
module.exports= () => {
    setTimeout(() => {
      executionTime.stop('reddy');
    }, 2000);
    setTimeout(() => {
      executionTime.stop('venkat');
    }, 3000);
}