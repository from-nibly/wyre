/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var wrapper = require('../util/callbackWrapper.js');
exports = module.exports = function (self, id, direction, ws) {
  self.id = id;

  self.request = function (message, options, callback) {
    direction.set(message, 'REQUEST');
    return this.send(message, options, callback);
  };

  self.close = function (code, reason, callback) {
    dfd = wrapper(callback);
    try {
      ws.close(code, reason);
    }
    catch (err) {
      dfd.reject(err);
    }
    dfd.resolve();
    return dfd.promise();
  };
};