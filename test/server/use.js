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


describe('use()', function () {
  it('should be able to change the key and still work client to server', function (done) {
    function keyGetter(message) {
      done();
      return message.reference;
    }
    function keySetter(message, key) {
      done();
      message.reference = key;
    }
    var server = new Server();
    var client = new Client();
    var port = getPort();
    var done = new MultiDone(new ClosingDone(done, [server]), 7);

    server.use('key', keyGetter, keySetter);
    client.use('key', keyGetter, keySetter);

    server.on('connection', function (connection) {
      serverConnection = connection;
      done();
    });

    server.on('request', function (context) {
      assert(context.message.test === 'ing');
      done();
      context.reply({}).done(function () {
        done();
      }).fail(function (err) {
        done(err);
      });
    });

    server.listen({
      port: port
    }).done(function () {
      client.connect('ws://localhost:' + port, function (err, connection) {
        assert(!err);
        assert(connection);
        connection.request({
          reference : 'test',
          test: 'ing'
        }).done(function () {
          done();
        }).fail(function (err) {
          done(err);
        });
      });
    }).fail(function (err) {
      done(err);
    });

  });

  it('should be able to change the key and still work server to client', function (done) {
    function keyGetter(message) {
      done();
      return message.reference;
    }
    function keySetter(message, key) {
      done();
      message.reference = key;
    }
    var server = new Server();
    var client = new Client();
    var port = getPort();
    var done = new MultiDone(new ClosingDone(done, [server]), 7);

    server.use('key', keyGetter, keySetter);
    client.use('key', keyGetter, keySetter);

    server.on('connection', function (connection) {
      serverConnection = connection;
      done();
    });

    client.on('request', function (context) {
      assert(context.message.test === 'ing');
      done();
      context.reply({}).done(function () {
        done();
      }).fail(function (err) {
        done(err);
      });
    });

    server.listen({
      port: port
    }).done(function () {
      client.connect('ws://localhost:' + port, function (err, connection) {
        assert(!err);
        assert(connection);
        serverConnection.request({
          reference : 'test',
          test: 'ing'
        }).done(function () {
          done();
        }).fail(function (err) {
          done(err);
        });
      });
    }).fail(function (err) {
      done(err);
    });

  });

  it('should be able to change the direction and still work client to server', function (done) {
    function dirGetter(message) {
      done();
      return message.foo;
    }
    function dirSetter(message, dir) {
      done();
      message.foo = dir;
    }
    var server = new Server();
    var client = new Client();
    var port = getPort();
    var done = new MultiDone(new ClosingDone(done, [server]), 8);
    var serverConnection;

    server.use('direction', dirGetter, dirSetter);
    client.use('direction', dirGetter, dirSetter);

    server.on('connection', function (connection) {
      serverConnection = connection;
      done();
    });

    server.on('request', function (context) {
      assert(context.message.test === 'ing');
      done();
      context.reply({}).done(function () {
        done();
      }).fail(function (err) {
        done(err);
      });
    });

    server.listen({
      port: port
    }).done(function () {
      client.connect('ws://localhost:' + port, function (err, connection) {
        assert(!err);
        assert(connection);
        connection.request({
          test: 'ing'
        }).done(function () {
          done();
        }).fail(function (err) {
          done(err);
        });
      });
    }).fail(function (err) {
      done(err);
    });

  });

  it('should be able to change the direction and still work server to client', function (done) {
    function dirGetter(message) {
      done();
      return message.foo;
    }
    function dirSetter(message, dir) {
      done();
      message.foo = dir;
    }
    var server = new Server();
    var client = new Client();
    var port = getPort();
    var done = new MultiDone(new ClosingDone(done, [server]), 8);
    var serverConnection;

    server.use('direction', dirGetter, dirSetter);
    client.use('direction', dirGetter, dirSetter);

    server.on('connection', function (connection) {
      serverConnection = connection;
      done();
    });

    client.on('request', function (context) {
      assert(context.message.test === 'ing');
      done();
      context.reply({}).done(function () {
        done();
      }).fail(function (err) {
        done(err);
      });
    });

    server.listen({
      port: port
    }).done(function () {
      client.connect('ws://localhost:' + port, function (err, connection) {
        assert(!err);
        assert(connection);
        serverConnection.request({
          test: 'ing'
        }).done(function () {
          done();
        }).fail(function (err) {
          done(err);
        });
      });
    }).fail(function (err) {
      done(err);
    });

  });

  it('should be able to change the type and still work client to server', function (done) {

    function typeGetter(message) {
      done();
      return message.bar;
    }
    var server = new Server();
    var client = new Client();
    server.use('type', typeGetter);
    client.use('type', typeGetter);
    var done = new MultiDone(new ClosingDone(done, [server]), 3);
    var port = getPort();
    var serverConnection;

    server.on('connection', function (connection) {
      serverConnection = connection;
      done();
    });

    server.on('message', 'testing', function (context) {
      assert(context.message.test === 'ing');
      assert(context.message.bar === context.type);
      done();
    });

    server.listen({
      port: port
    }).done(function () {
      client.connect('ws://localhost:' + port, function (err, connection) {
        assert(!err);
        assert(connection);
        connection.send({
          test: 'ing',
          bar: 'testing'
        });
      });
    }).fail(function (err) {
      done(err);
    });
  });

  it('should be able to change the type and still work server to client', function (done) {

    function typeGetter(message) {
      done();
      return message.bar;
    }
    var server = new Server();
    var client = new Client();
    server.use('type', typeGetter);
    client.use('type', typeGetter);
    var done = new MultiDone(new ClosingDone(done, [server]), 3);
    var port = getPort();
    var serverConnection;

    server.on('connection', function (connection) {
      serverConnection = connection;
      done();
    });

    client.on('message', 'testing', function (context) {
      assert(context.message.test === 'ing');
      assert(context.message.bar === context.type);
      done();
    });

    server.listen({
      port: port
    }).done(function () {
      client.connect('ws://localhost:' + port, function (err, connection) {
        assert(!err);
        assert(connection);
        serverConnection.send({
          test: 'ing',
          bar: 'testing'
        });
      });
    }).fail(function (err) {
      done(err);
    });
  });


});