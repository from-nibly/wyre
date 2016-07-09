/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var wyre = require('wyre');

describe('Browser', function () {
  var client = new wyre({ logLevel : 'silly' });
  var conn;
  it('should be able to connect to a server', function (done) {
    client.connect('ws://localhost:1234', function (err, connection) {
      conn = connection;
      console.log('connected', err, connection);
      done(err);
    });
  });
  it('should be able to send an empty message', function (done) {
    client.on('message', function (context) {
      done();
    });
    conn.send({}, function (err) {
      assert(!err);
    });
  });
  it('should be able to send an typed message', function (done) {
    client.on('message', function (context) {
      done();
    });
    conn.send({type : 'test'}, function (err) {
      assert(!err);
    });
  });
  it('should be able to send a request and get a reply', function (done) {
    conn.request({ key : 'testing' }, function (err, reply) {
      assert(reply.message.key === 'testing');
      done(err);
    });
  });
  it('should be able to send a request and get an error', function (done) {
    conn.request({ key : 'testing1', type : 'error' }, function (err, reply) {
      assert(!reply);
      assert(err.message.key === 'testing1');
      done();
    });
  });
  it('should be able to send a request and get a partial', function (done) {
    conn.request({ key : 'testing2', type : 'partial' }, function (err, reply, partial) {
      assert(!reply);
      assert(!err);
      assert(partial);
      assert(partial.message.key === 'testing2');
      done();
    });
  });
  it('should be able to recieve a message', function (done) {
    client.on('message', 1, function (context) {
      assert(context.message.type === 1);
      done();
    });
    conn.send({type : 1}, function (err) {
      assert(!err);
    });
  });

  it('should be able to recieve a request and reply', function (done) {
    client.on('request', 2, function (context) {
      assert(context.message.type === 2);
      assert(context.message.direction === 'REQUEST');
      context.reply(context.message, function (err) {
        assert(!err);
        done();
      });
    });
    conn.send({ type : 2 }, function (err) {
      assert(!err);
    });
  });

  it('should be able to recieve a request and error', function (done) {
    client.on('request', 2, function (context) {
      assert(context.message.type === 2);
      assert(context.message.direction === 'REQUEST');
      context.reply(context.message, function (err) {
        assert(!err);
        done();
      });
    });
    conn.send({ type : 2 }, function (err) {
      assert(!err);
    });
  });

});

describe('shutting down', function () {
  it('should shutdown the server when a kill message is sent', function (done) {
    var client = new wyre();
    client.connect('ws://localhost:1234', function (err, connection) {
      console.log('connected sending kill message');
      connection.send({ type : 'kill' }, function (err) {
        done(err);
      });
    });
  });
});
