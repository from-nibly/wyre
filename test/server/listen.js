/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var assert = require('assert'),
  Client = require('../../lib/index.js').Client,
  Server = require('../../lib/index.js').Server,
  MultiDone = require('../multiDone.js'),
  ClosingDone = require('../closingDone.js'),
  getPort = require('../portGetter.js');

describe('listen()', function() {

  it('should throw an error if there is no options object provided', function(done) {
    var server = new Server();
    try {
      server.listen();
      done('should have thrown an error');
    } catch (err) {
      done();
    }
  });

  it('should throw an error if options is not an object', function(done) {
    var server = new Server();
    try {
      server.listen('testing');
      done('should have thrown an error');
    } catch (err) {
      done();
    }
  });

  it('should throw an error if options does not have a port', function(done) {
    var server = new Server();
    try {
      server.listen({});
      done('should have thrown an error');
    } catch (err) {
      done();
    }
  });

  it('should not throw an error if options does have a port', function(done) {
    var server = new Server();
    done = new ClosingDone(done, [server]);
    var port = getPort();
    try {
      server.listen({
        port: port
      }, function(err) {
        done(err);
      });
    } catch (err) {
      done(err);
    }
  });

}); // end listen()