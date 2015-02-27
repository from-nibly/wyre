#Server
The server object is created when you call `new Server()`  this object manages the configuration of the connection to the server, deals with routing events, and inititates the connection to the server.

```JSON
{
  listen : [Function],
  on : [Function],
  use : [Function]
}
```

##new Server([options])
The constructor that takes an optional options argument.

```JSON
{
    logLevel : Integer||String
}
```

`logLevel` : A number from 0 to 6 (zero being no logs) or one of the following strings `error`, `warn`, `info`, `verbose`, `debug`, `silly`.

##listen(options, callback)
the functin used to start the server.

`options` : used to configure the websocket server.  The only required option is `port`.  This is passed drectly to [ws](https://github.com/websockets/ws/blob/master/doc/ws.md#new-wsserveroptions-callback).  Other options are explained on ws's documentation.

`callback` : a [callback or defered object](gettingStarted/callbacksPromises/).

##on(event [, type], callback)
the function used to configure how the server handles different events (see [Event Listening](configuration/eventListening)).

`event` : the type of event to be configured.

`type` : optionaly used for the `'message'` and `'request'` events. to further filter event handling.

`callback` : called whenever the event happens.  The data recieved varries with the different events (see [Event Listening](configuration/eventListening)).

##use(type, getter, setter)
the function used to configure how the server processes incoming and outgoing messages (see [Configuration](configuration/use)).

`type` : the type of getter/setter you want to configure.

`getter` : the function used to get information from the message.

`setter` : the function used to set information on the message on its way out.