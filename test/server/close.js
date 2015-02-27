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


describe('close()', function () {
  it('should call the servers on close function when the client closes', function (done) {
    var server = new Server();
    var client = new Client();
    var done = new MultiDone(new ClosingDone(done, [server]), 5);
    var port = getPort();
    var connectionId;
    var serverConnectionId;

    server.on('connection', function (connection) {
      serverConnectionId = connection.id;
      done();
    });

    server.on('close', function (code, reason, connection) {
      assert(connection);
      assert(connection.id === serverConnectionId);
      assert(code === 1000);
      assert(reason === 'testing');
      done();
    });

    client.on('close', function (code, reason, connection) {
      assert(connection);
      assert(connection.id === connectionId);
      assert(code === 1000);
      assert(reason === 'testing');
      done();
    });

    server.listen({
      port: port
    }, function (err) {
      assert(!err);

      client.connect('ws://localhost:' + port, function (err, connection) {
        connectionId = connection.id;
        assert(!err);
        assert(connection);
        done();
        connection.close(1000, 'testing', function (err) {
          assert(!err);
          done();
        });
      });
    });
  });

  it('should call the clients on close function when the server closes', function (done) {
    var server = new Server();
    var client = new Client();
    var done = new MultiDone(new ClosingDone(done, [server]), 5);
    var port = getPort();
    var connectionId;
    var serverConnectionId;

    server.on('connection', function (connection) {
      serverConnectionId = connection.id;
      done();
    });

    server.on('close', function (code, reason, connection) {
      assert(connection);
      assert(connection.id === serverConnectionId);
      assert(code === 1000);
      assert(reason === 'testing');
      done();
    });

    client.on('close', function (code, reason, connection) {
      assert(connection);
      assert(connection.id === connectionId);
      assert(code === 1000);
      assert(reason === 'testing');
      done();
    });

    server.listen({
      port: port
    }, function (err) {
      assert(!err);

      client.connect('ws://localhost:' + port, function (err, connection) {
        connectionId = connection.id;
        assert(!err);
        assert(connection);
        done();
        server.close(1000, 'testing', function (err) {
          assert(!err);
          done();
        });
      });
    });
  });
});