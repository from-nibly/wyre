/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
exports = module.exports = function (done, count, transports) {
  return function(err) {
    if (count <= 0) {
      done(new Error('called done too many times'));
    }
    count--;
    if (count === 0 || err) {
      done(err);
    }
  };
};