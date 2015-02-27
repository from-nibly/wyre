/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
function MessageContext(message, type, connection, setDirection, setKey, direction, key) {
  this.message = message;
  this.type = type;
  this.connection = connection;

  if (direction === 'REQUEST') {
    this.reply = function(messageObject, options, callback) {
      return send(messageObject, options, callback, 'REPLY');
    };

    this.error = function(messageObject, options, callback) {
      return send(messageObject, options, callback, 'ERROR');
    };

    this.partial = function(messageObject, options, callback) {
      return send(messageObject, options, callback, 'PARTIAL');
    };

    function send(messageObject, options, callback, dir) {
      setKey(messageObject, key);
      setDirection(messageObject, dir);
      return connection.send(messageObject, options, callback);
    }
  }
};

exports = module.exports = MessageContext;