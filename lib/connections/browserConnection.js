/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var uuid = require('uuid'),
    wrapper = require('../util/callbackWrapper.js'),
    shared = require('./shared.js');

function Connection(ws, codec, direction, key, requestMap, id, logger) {
  shared(this, id, direction, ws);

  this.send = function (message, options, callback) {
    logger.silly('sending message', message);
    var dfd = wrapper(callback || options);
    options = callback ? options : {};
    //maybe remove toUpperCase() and || event for performance
    var dir = (direction.get(message) || 'MESSAGE').toUpperCase();
    var k = key.get(message);

    if (!k && dir === 'REQUEST') {
      k = uuid.v4();
      key.set(message, k);
    }

    var wireMessage = codec.encode(message);

    try {
      ws.send(wireMessage, options);
    }
    catch (err) {
      dfd.reject(err);
    }
    if (dir === 'REQUEST') {
      logger.silly('storing request');
      requestMap[k] = dfd;
    } else {
      logger.silly('resolving send');
      dfd.resolve();
    }
    return dfd.promise();
  };

};

exports = module.exports = Connection;
