[![Build Status](https://drone.io/github.com/from-nibly/wyre/status.png)](https://drone.io/github.com/from-nibly/wyre/latest)

#wyre
wyre is a websocket library that will change the way you use websockets.  Wyre allows you to send messages that require a response message to be sent. Wyre also allows you to filter messages based on the type of message which you specify.

#Getting Started

##Server
```JAVASCRIPT
var Server = require('wyre').Server;
var server = new Server();

//here we start the server
server.listen({ port : 1234}, function(err) {
    console.log('server is started!');
});
```

###here we can listen for new connections
```JAVASCRIPT
server.on('connection', function(connection) {
    console.log('connection recieved');
});
```

###here we can listen for incoming messages
```JAVASCRIPT
server.on('message', function(context) {
    console.log('got a message', context.message)
});
```

###here we can listen for messages where the message type is a tweet
```JAVASCRIPT
server.on('message', 'tweet', function(context) {
    console.log('got a tweet', context.message);
});
```

##Client
Clients are very similar but you connect to a server differently
```JAVASCRIPT
var Client = require('wyre').Client;
var client = new Client();

//here we start the server
client.connect('ws://localhost:1234', function(err, connection) {
  if(err) {
    console.log('error connecting to the server', err);
  }
  else {
    console.log('client connected to server', connection);
  }
});
```

##READY FOR MORE?
Head over to our [ReadTheDocs](./docs/index.md) for more information.