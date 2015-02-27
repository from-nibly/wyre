/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var p = require('jpromise');

exports = module.exports = function(done, transports) {
  return function(err) {
    closeTransports(transports, function(e) {
      done(err || e);
    });
  }
};

function closeTransports(transports, done) {
  if (!transports) {
    return;
  }
  var dfds = [];
  for (var x in transports) {
    if (transports[x]) {
      var dfd = new p();
      dfds.push(dfd);
      transports[x].close(1000, 'none', dfd);
    }
  }
  p.when(dfds).done(function() {
    done();
  }).fail(function(err) {
    done(err);
  });
}