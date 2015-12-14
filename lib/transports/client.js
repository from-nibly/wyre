/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var wrapper = require('../util/callbackWrapper.js'),
  WebSocket = require('ws'),
  Logger = require('../util/logger.js'),
  Context = require('../context/context.js'),
  shared = require('./shared.js');

function Client(options, Connection) {
  //default log level is info
  var logger = new Logger(options ? options.logLevel : 3);
  var useMap = {};
  var events = {};
  var ws;
  var context;

  shared(this, useMap, events, logger);

  this.connect = function (url, protocols, callback) {
    if (arguments.length === 2) {
      callback = protocols;
      protocols = [];
    }
    var dfd = wrapper(callback);
    ws = new WebSocket(url, protocols);
    context = new Context(ws, logger, useMap, events, Connection);
    ws.addEventListener('open', function() {
      logger.verbose('resolving with connection', context.connection);
      dfd.resolve(context.connection);
    });
    ws.addEventListener('error', function(err) {
      if (dfd.state() === 0) {
        logger.verbose('rejecting connection because of error', err);
        dfd.reject(err);
      }
    });
    return dfd.promise();
  };

};


exports = module.exports = Client;
