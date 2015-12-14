/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var wrapper = require('../util/callbackWrapper.js'),
  WebSocketServer = require('ws').Server,
  Logger = require('../util/logger.js'),
  Context = require('../context/context.js'),
  Connection = require('../connections/connection.js'),
  shared = require('./shared.js'),
  p = require('jpromise');


function Server(options) {
  options = options || {};
  var logger = options.logger || new Logger(options ? options.logLevel : 3);
  var events = {};
  events.id = Math.random();
  var contexts = [];
  var useMap = {};
  var wss;
  //setup common things
  shared(this, useMap, events, logger);

  this.listen = function(options, callback) {
    dfd = wrapper(callback);
    //throw an error if we don't have an object with a port for option
    if (!options || typeof options !== 'object' || !options.port) {
      throw new Error('an options object with at least a port must be provided');
    }

    wss = new WebSocketServer(options, function() {
      dfd.resolve();
    });

    wss.on('connection', function(ws) {
      logger.verbose('recieved connection');
      var context = new Context(ws, logger, useMap, events, Connection, function(c) {
        contexts.splice(contexts.indexOf(c), 1);
      });
      events.connection(context.connection);
      contexts.push(context);
    });

    return dfd.promise();
  };

  this.close = function(code, reason, callback) {
    logger.verbose('closing all connections');
    var dfd = wrapper(callback);
    dfds = [];
    for (var x in contexts) {
      var d = new p();
      dfds.push(d);
      try {
        logger.silly('closing', contexts[x].id);
        contexts[x].connection.close(code, reason);
        d.resolve();
      } catch (err) {
        d.reject(err);
      }
    }
    p.when(dfds).done(function() {
      wss.close();
      dfd.resolve();
    }).fail(function(err) {
      wss.close();
      dfd.reject(err);
    });
    return dfd.promise();
  };

};
exports = module.exports = Server;
