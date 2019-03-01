"use strict";

const prettyHrtime = require('pretty-hrtime');

const namedPerformances = {};
const defaultName = 'default';

const performance = (logInstance) => {
  return {
    start: (name) => {
      name = name || defaultName;
      namedPerformances[name] = {
        startAt: process.hrtime(),
      }
    },
    stop: (name) => {
      name = name || defaultName;
      const startAt = namedPerformances[name] && namedPerformances[name].startAt;
      if(!startAt) throw new Error('Namespace: '+name+' doesnt exist');
      const diff = process.hrtime(startAt);
      const time = diff[0] * 1e3 + diff[1] * 1e-6;
      const words = prettyHrtime(diff);
      const preciseWords = prettyHrtime(diff, {precise:true});
      const verboseWords = prettyHrtime(diff, {verbose:true});
      if (logInstance) {
        logInstance('Total Time:' + time);
      }
      
      return { 
        time: time,
        words: words,
        preciseWords: preciseWords,
        verboseWords: verboseWords
      };
    }
  }
};

module.exports = performance;