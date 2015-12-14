/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var uuid = require('uuid'),
    MessageContext = require('./messageContext');
function Context (ws, logger, useMap, events, Connection, closed) {
  var self = this;
  useMap.key = useMap.key || defaultKey;
  useMap.direction = useMap.direction || defaultDirection;
  useMap.codec = useMap.codec || defaultCodec;
  useMap.type = useMap.type || defaultType;
  var requestMap = {};

  this.id = uuid.v4();
  this.ws = ws;
  this.connection = new Connection(ws, useMap.codec, useMap.direction, useMap.key, requestMap, this.id, logger);


  //set up what happens for each event
  ws.addEventListener('message', function (data) {
    try {
      logger.debug('got message from socket', data.data, data.type);
      var string;
      //make sure the message content is in a string
      if (data.type === 'Text') {
        string = data.data;
      } else {
        string = data.data.toString('utf8');
      }
      //convert to an object and pull out the properties
      var obj = useMap.codec.decode(string);
      var direction = (useMap.direction.get(obj) || 'MESSAGE').toUpperCase();
      var type = useMap.type.get(obj);
      var key = useMap.key.get(obj);

      var messageContext = new MessageContext(obj, type, self.connection, useMap.direction.set, useMap.key.set, direction, key);

      if (direction === 'REPLY' || direction === 'ERROR' || direction === 'PARTIAL') {
        //we need to find the request context and call its promise
        var dfd = requestMap[key];
        if (!dfd) {
          logger.warn('unknow reply was recieved', obj);
        } else if (direction === 'REPLY') {
          delete requestMap[key];
          dfd.resolve(messageContext);
        } else if (direction === 'PARTIAL') {
          dfd.notify(messageContext);
        } else {
          delete requestMap[key];
          dfd.reject(messageContext);
        }
      } else { //if it is a request or a message we just call the callback
        // console.log('getting event', direction, type);
        var eventHandler = getEvent(direction, type)
        // console.log('got event', events.id, event);
        eventHandler(messageContext);
      }
    }
    catch (err) {
      events['error'](err);
    }
  });
  function getEvent(direction, type) {
    var rtn;
    //if there is a type we need to get the typed callback
    if (type) {
      rtn = events[direction.toLowerCase() + '/' + type];
    }
    return rtn || events[direction.toLowerCase()];
  }

  ws.addEventListener('close', function (data) {
    if (closed) {
      closed(self);
    }
    logger.verbose('calling close callback', self.connection.id);
    events['close'](data.code, data.reason, self.connection);
  });

  ws.addEventListener('error', function (err) {
    events['error'](err);
  });

  //TODO automatically deal with ping pongs
  ws.addEventListener('ping', function (err) {
    events['ping'](err);
  });

  ws.addEventListener('pong', function (err) {
    events['pong'](err);
  });

};

var defaultKey = {
  get: function (message) {
    return message.key;
  },
  set: function (message, key) {
    message.key = key;
  }
};

var defaultDirection = {
  get: function (message) {
    return message.direction;
  },
  set: function (message, direction) {
    message.direction = direction;
  }
}

var defaultCodec = {
  encode: function (message) {
    return JSON.stringify(message);
  },
  decode: function (string) {
    return JSON.parse(string);
  }
}

var defaultType = {
  get: function (message) {
    return message.type;
  }
}

exports = module.exports = Context;
