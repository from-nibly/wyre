/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var Server = require('../../lib/index.js').Server;

var server = new Server();

server.on('message', function (context) {
  context.connection.send(context.message);
});

server.on('message', 'test', function (context) {
  context.connection.send(context.message);
});

server.on('request', function (context) {
  context.reply(context.message);
});

server.on('request', 'error', function (context) {
  context.error(context.message);
});

server.on('request', 'partial', function (context) {
  context.partial(context.message);
});

server.on('message', 1, function (context) {
  context.connection.send(context.message);
});

server.on('message', 2, function (context) {
  context.message.key = "testing";
  context.connection.request(context.message);
});

server.on('message', 'kill', function (context) {
  console.log('recieved kill message');
    server.close();
});

server.listen({ port : 1234 }, function (err) {
  console.log(err);
});
