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

describe('send()', function() {

  it('should be able to recieve a message from a client', function(done) {
    var server = new Server();
    var client = new Client();
    var done = new MultiDone(new ClosingDone(done, [server]), 2);
    var port = getPort();

    server.on('connection', function(connection) {
      done();
    });

    server.on('message', function(context) {
      assert(context.message.test === 'ing');
      done();
    });

    server.listen({
      port: port
    }).done(function() {
      client.connect('ws://localhost:' + port, function(err, connection) {
        assert(!err);
        assert(connection);
        connection.send({
          test: 'ing'
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

  it('should be able to send a message to a client', function(done) {
    var server = new Server();
    var client = new Client();
    var done = new MultiDone(new ClosingDone(done, [server]), 2);
    var port = getPort();
    var serverConnection;

    server.on('connection', function(connection) {
      serverConnection = connection;
      done();
    });

    client.on('message', function(context) {
      assert(context.message.test === 'ing');
      done();
    });

    server.listen({
      port: port
    }).done(function() {
      client.connect('ws://localhost:' + port, function(err, connection) {
        assert(!err);
        assert(connection);
        serverConnection.send({
          test: 'ing'
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

  it('should be able to send a typed message to a client', function(done) {
    var server = new Server();
    var client = new Client();
    var done = new MultiDone(new ClosingDone(done, [server]), 2);
    var port = getPort();
    var serverConnection;

    server.on('connection', function(connection) {
      serverConnection = connection;
      done();
    });

    client.on('message', 'testing', function(context) {
      assert(context.message.test === 'ing');
      assert(context.message.type === context.type);
      done();
    });

    server.listen({
      port: port
    }).done(function() {
      client.connect('ws://localhost:' + port, function(err, connection) {
        assert(!err);
        assert(connection);
        serverConnection.send({
          test: 'ing',
          type: 'testing'
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

  it('should be able to send a typed message to a server', function(done) {
    var server = new Server();
    var client = new Client();
    var done = new MultiDone(new ClosingDone(done, [server]), 2);
    var port = getPort();
    var serverConnection;

    server.on('connection', function(connection) {
      serverConnection = connection;
      done();
    });

    server.on('message', 'testing', function(context) {
      assert(context.message.test === 'ing');
      assert(context.message.type === context.type);
      done();
    });

    server.listen({
      port: port
    }).done(function() {
      client.connect('ws://localhost:' + port, function(err, connection) {
        assert(!err);
        assert(connection);
        connection.send({
          test: 'ing',
          type: 'testing'
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

  it('should be able to send a number typed message to a server', function(done) {
    var server = new Server();
    var client = new Client();
    var done = new MultiDone(new ClosingDone(done, [server]), 2);
    var port = getPort();
    var serverConnection;

    server.on('connection', function(connection) {
      serverConnection = connection;
      done();
    });

    server.on('message', 5, function(context) {
      assert(context.message.test === 'ing');
      assert(context.message.type === context.type);
      done();
    });

    server.listen({
      port: port
    }).done(function() {
      client.connect('ws://localhost:' + port, function(err, connection) {
        assert(!err);
        assert(connection);
        connection.send({
          test: 'ing',
          type: 5
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

  it('should be able to send a number typed message to a client', function(done) {
    var server = new Server();
    var client = new Client();
    var done = new MultiDone(new ClosingDone(done, [server]), 2);
    var port = getPort();
    var serverConnection;

    server.on('connection', function(connection) {
      serverConnection = connection;
      done();
    });

    client.on('message', 5, function(context) {
      assert(context.message.test === 'ing');
      assert(context.message.type === context.type);
      done();
    });

    server.listen({
      port: port
    }).done(function() {
      client.connect('ws://localhost:' + port, function(err, connection) {
        assert(!err);
        assert(connection);
        serverConnection.send({
          test: 'ing',
          type: 5
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

}); // end send()