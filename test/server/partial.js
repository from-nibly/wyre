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



describe('partial()', function() {

  it('should be able to recieve a request from a client and send a partial reply', function(done) {
    var server = new Server();
    var client = new Client();
    var done = new MultiDone(new ClosingDone(done, [server]), 6);
    var port = getPort();
    var serverConnection;

    server.on('connection', function(connection) {
      serverConnection = connection;
      done();
    });

    server.on('request', function(context) {
      assert(context.message.test === 'ing');
      done();
      context.partial({}).done(function() {
        done();
        context.reply({}).done(function() {
          done();
        }).fail(function(err) {
          done(err);
        });
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
          assert(reply)
          done();
        }).fail(function(err) {
          done(err);
        }).progress(function(data) {
          assert(data);
          done();
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

  it('should be able to send a request to a client and send a partial reply', function(done) {
    var server = new Server();
    var client = new Client();
    var done = new MultiDone(new ClosingDone(done, [server]), 6);
    var port = getPort();
    var serverConnection;

    server.on('connection', function(connection) {
      serverConnection = connection;
      done();
    });

    client.on('request', function(context) {
      assert(context.message.test === 'ing');
      done();
      context.partial({}).done(function() {
        done();
        context.reply({}).done(function() {
          done();
        }).fail(function(err) {
          done(err);
        });
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
          assert(reply)
          done();
        }).fail(function(err) {
          done(err);
        }).progress(function(data) {
          assert(data);
          done();
        });
      });
    }).fail(function(err) {
      done(err);
    });
  });

}); //end partial()