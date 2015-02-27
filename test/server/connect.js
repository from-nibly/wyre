/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var assert = require('assert'),
  Server = require('../../lib/index.js').Server,
  Client = require('../../lib/index.js').Client,
  MultiDone = require('../multiDone.js'),
  ClosingDone = require('../closingDone.js'),
  getPort = require('../portGetter.js');

describe('connect()', function() {

  it('should be able to recieve a connection from a client', function(done) {
    var server = new Server();
    var client = new Client();
    var done = new MultiDone(new ClosingDone(done, [server]), 2);
    var port = getPort();

    server.on('connection', function(connection) {
      done();
    });

    server.listen({
      port: port
    }).done(function() {
      client.connect('ws://localhost:' + port, function(err, connection) {
        assert(!err);
        assert(connection);
        console.log('client connected');
        done();
      });
    }).fail(function(err) {
      done(err);
    });
  });

  it('should throw an error if connection cannot be established', function(done) {
    var client = new Client();
    var port = getPort();

    client.connect('ws://localhost:' + port, function(err, connection) {
      assert(!connection);
      assert(err);
      done();
    });
  });

});