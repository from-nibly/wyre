/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var Client = require('./transports/client.js'),
    Connection = require('./connections/browserConnection.js');

function BrowserClient(options) {
  return new Client(options, Connection);
};

exports = module.exports = BrowserClient;