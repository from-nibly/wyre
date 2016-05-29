/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
function Shared(self, useMap, events, logger) {

  self.on = function(event, type, callback) {
    event = event.toLowerCase();
    //TODO validation
    if (!callback) {
      if (typeof type !== 'function') {
        throw new Error('argument callback must be a function');
      }
      events[event] = type;
    } else {
      if (typeof callback !== 'function') {
        throw new Error('argument callback must be a function');
      }
      events[event + '/' + type] = callback;
    }
    logger.debug('added new event', event);
  };

  self.use = function(type, getter, setter) {
    //TODO validation of getters and setters being present
    useMap[type] = {};
    if (type === 'codec') {
      useMap[type].decode = getter;
      useMap[type].encode = setter;
    }
    else {
      useMap[type].get = getter;
      useMap[type].set = setter;
    }
  };

  events['connection'] = function(connection) {
    logger.info('connection established', connection);
  };
  events['message'] = function(context) {
    logger.info('recieved message', context.message);
  };
  events['request'] = function(context) {
    logger.info('recieved request', context.message);
  };
  events['close'] = function(code, reason, connection) {
    logger.info('connection closed', code, reason, connection);
  };
  events['error'] = function(err) {
    logger.info('error', err);
  };
};
exports = module.exports = Shared;
