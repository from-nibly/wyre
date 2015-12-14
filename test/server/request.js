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


describe('request()', function() {

  it('should be able to recieve a request from a client and reply', function(done) {
    var server = new Server({ logLevel : 0 });
    var client = new Client({ logLevel : 0 });
    var done = new MultiDone(new ClosingDone(done, [server]), 4);
    var port = getPort();
    var serverConnection;

    server.on('connection', function(connection) {
      serverConnection = connection;
      done();
    });

    server.on('request', function(context) {
      assert(context.message.test === 'ing');
      done();
      context.reply(context.message).done(function() {
        done();
      }).fail(function(err) {
        done(err);
      });
    });

    server.listen({
      port: port
    }).done(function() {
      client.connect('ws://localhost:' + port, function(err, connection) {
        assert(!err);
        assert(connection);
        connection.request({
          test: 'ing'
        }).done(function(reply) {
          assert(reply.message.test === 'ing');
          done();
        }).fail(function(err) {
          done(err);
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

  it('should be able to send a request to a client and reply', function(done) {
    var server = new Server({ logLevel : 0});
    var client = new Client({ logLevel : 0 });
    var done = new MultiDone(new ClosingDone(done, [server]), 4);
    var port = getPort();
    var serverConnection;

    server.on('connection', function(connection) {
      serverConnection = connection;
      done();
    });

    client.on('request', function(context) {
      assert(context.message.test === 'ing');
      done();
      context.reply(context.message).done(function() {
        done();
      }).fail(function(err) {
        done(err);
      });
    });

    server.listen({
      port: port
    }).done(function() {
      client.connect('ws://localhost:' + port, function(err, connection) {
        assert(!err);
        assert(connection);
        serverConnection.request({
          test: 'ing'
        }).done(function(reply) {
          assert(reply.message.test === 'ing');
          done();
        }).fail(function(err) {
          done(err);
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

  it('should be able to recieve a typed request from a client and reply', function(done) {
    var server = new Server({ logLevel : 0});
    var client = new Client({ logLevel : 0 });
    var done = new MultiDone(new ClosingDone(done, [server]), 4);
    var port = getPort();
    var serverConnection;

    server.on('connection', function(connection) {
      serverConnection = connection;
      done();
    });

    server.on('request', 'testing', function(context) {
      assert(context.message.test === 'ing');
      done();
      context.reply(context.message).done(function() {
        done();
      }).fail(function(err) {
        done(err);
      });
    });

    server.listen({
      port: port
    }).done(function() {
      client.connect('ws://localhost:' + port, function(err, connection) {
        assert(!err);
        assert(connection);
        connection.request({
          test: 'ing',
          type: 'testing'
        }).done(function(reply) {
          assert(reply.message.test === 'ing');
          assert(reply.message.type === 'testing');
          done();
        }).fail(function(err) {
          done(err);
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

  it('should be able to recieve a typed request from a client and reply', function(done) {
    var server = new Server({ logLevel : 0});
    var client = new Client({ logLevel : 0 });
    var done = new MultiDone(new ClosingDone(done, [server]), 4);
    var port = getPort();
    var serverConnection;

    server.on('connection', function(connection) {
      serverConnection = connection;
      done();
    });

    client.on('request', 'testing', function(context) {
      assert(context.message.test === 'ing');
      done();
      context.reply(context.message).done(function() {
        done();
      }).fail(function(err) {
        done(err);
      });
    });

    server.listen({
      port: port
    }).done(function() {
      client.connect('ws://localhost:' + port, function(err, connection) {
        assert(!err);
        assert(connection);
        serverConnection.request({
          test: 'ing',
          type: 'testing'
        }).done(function(reply) {
          assert(reply.message.test === 'ing');
          assert(reply.message.type === 'testing');
          done();
        }).fail(function(err) {
          done(err);
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

}); //end request()
