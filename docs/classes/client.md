#Client
The client object is created when you call `new Client()`  this object manages the configuration of the connection to the server, deals with routing events, and inititates the connection to the server.

```JSON
{
  connect : [Function],
  on : [Function],
  use : [Function]
}
```

##new Client([options])
The constructor that takes an optional options argument.

```JSON
{
    logLevel : Integer||String
}
```

`logLevel` : A number from 0 to 6 (zero being no logs) or one of the following strings `error`, `warn`, `info`, `verbose`, `debug`, `silly`.

##connect(url [, options], callback)
the function used to initiate a connection to a websocket server.

`url` : a websocket url used to connect to the server
Example: `'ws:\\localhost:1234'`

`options` a configuration option that is passed on to the ws library see [ws](https://github.com/websockets/ws/blob/master/doc/ws.md#new-wswebsocketaddress-protocols-options) for more details.

`callback` a  [callback or defered object](gettingStarted/callbacksPromises/).  This will return an error or a [connection object](classes/connection) when the connection is complete.

Example:
```JAVASCRIPT
client.connect('ws:\\localhost', function(err, connection) {
  if(err) {
    console.log('there was an error connecting to the server', err);
  }
  else {
    console.log('connected to the server!, connection);
  }
});
```

##on(event [, type], callback)
the function used to configure how the client handles different events (see [Event Listening](configuration/eventListening)).

`event` : the type of event to be configured.

`type` : optionaly used for the `'message'` and `'request'` events. to further filter event handling.

`callback` : called whenever the event happens.  The data recieved varries with the different events (see [Event Listening](configuration/eventListening)).

##use(type, getter, setter)
the function used to configure how the client processes incoming and outgoing messages (see [Configuration](configuration/use)).

`type` : the type of getter/setter you want to configure.

`getter` : the function used to get information from the message.

`setter` : the function used to set information on the message on its way out.