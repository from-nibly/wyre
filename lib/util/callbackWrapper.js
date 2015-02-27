/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var p = require('jpromise');
function CallbackWrapper(callback) {
  if (typeof callback === 'function') {
    var rtn = new p();
    rtn.done(function(value) {
      callback(null, value);
    }).fail(function(err) {
      callback(err);
    }).progress(function(value) {
      callback(null, null, value);
    });
    return rtn;
  } else {
    return callback || new p();
  }
};
exports = module.exports = CallbackWrapper;