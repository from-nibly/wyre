/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var Server = require('./transports/server.js'),
  Client = require('./transports/client.js'),
  Connection = require('./connections/connection.js');

exports = module.exports;

exports.Server = function(options) {
  return new Server(options);
};
exports.Client = function(options) {
  return new Client(options, Connection);
};