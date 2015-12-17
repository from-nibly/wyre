var Server = require('wyre').Server;
var server = new Server();

var names = {};

server.on('connection', function(connection) {
  console.log('someone connected to me');
  names[connection.id] = 'someone';
});

server.on('message', 'name', function(context) {
  console.log(context.message.first + ' sent me their name');
  names[context.connection.id] = context.message.first;
});

server.on('request', 'name', function(context) {
  console.log(names[context.connection.id] + ' is asking for my name');
  context.reply({ first: 'steve', last: 'johnson' });
});

server.listen({ port: 1234 }, function(err) {
  if (err) {
    console.log('problem starting the server' + err);
  }
});

var Client = require('wyre').Client;
var client = new Client();

client.connect('ws://localhost:1234', function(err, connection) {
  connection.send({ type: 'name', first: 'bob', last: 'swenson' }, function(err) {
    if (err) {
      console.log('somthing went wrong ' + err);
    } else {
      connection.request({ type: 'name' }, function(err, replyContext) {
        console.log('the servers name is ' + replyContext.message.first);
        connection.close();
        server.close();
      });
    }
  });
});
