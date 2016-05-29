/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
function Logger(level, overrides) {

  overrides = overrides || {};
  this.level = levelToNum(level);
  var error = overrides.error || console.log;
  var warn = overrides.warn || console.log;
  var info = overrides.info || console.log;
  var debug = overrides.debug || console.log;
  var silly = overrides.silly || console.log;

  this.error = function() {
    if (this.level >= 1) {
      error.apply(console, arguments);
    }
  };

  this.warn = function() {
    if (this.level >= 2) {
      warn.apply(console, arguments);
    }
  };

  this.info = function() {
    if (this.level >= 3) {
      info.apply(console, arguments);
    }
  };

  this.debug = function() {
    if (this.level >= 4) {
      debug.apply(console, arguments);
    }
  };

  this.silly = function() {
    if (this.level >= 5) {
      silly.apply(console, arguments);
    }
  };

  return this;
}

function levelToNum(level) {
  if (typeof level === 'number') {
    return level;
  }
  switch (level) {
    case 'none':
      return 0;
    case 'error':
      return 1;
    case 'warn':
      return 2;
    case 'info':
      return 3;
    case 'debug':
      return 4;
    case 'silly':
      return 5;
    default:
      return 3;
  }
}
exports = module.exports = Logger;
