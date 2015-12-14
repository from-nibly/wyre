/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
function Logger(level) {

  this.level = levelToNum(level);

  this.log = function() {
    console.log.apply(this, arguments);
  }

  this.error = function() {
    if (this.level >= 1) {
      console.log.apply(console, arguments);
    }
  };

  this.warn = function() {
    if (this.level >= 2) {
      console.log.apply(console, arguments);
    }
  };

  this.info = function() {
    if (this.level >= 3) {
      console.log.apply(console, arguments);
    }
  };

  this.verbose = function() {
    if (this.level >= 4) {
      console.log.apply(console, arguments);
    }
  };

  this.debug = function() {
    if (this.level >= 5) {
      console.log.apply(console, arguments);
    }
  };

  this.silly = function() {
    if (this.level >= 6) {
      console.log.apply(console, arguments);
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
    case 'verbose':
      return 4;
    case 'debug':
      return 5;
    case 'silly':
      return 6;
    default:
      return 3;
  }
}
exports = module.exports = Logger;
