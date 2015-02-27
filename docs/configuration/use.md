#Configuration
Configuring the server with the `use` method is optional as there are defaults for everything. The `use` method is used to change how incoming and outgoing messages/requests are processed.

##use(type, getter, setter)
the function used to configure how the client processes incoming and outgoing messages (see [Configuration](configuration/use)).

`type` : the type of getter/setter you want to configure.

`getter` : the function used to get information from the message.

`setter` : the function used to set information on the message on its way out.

##Types
There are different types of getter/setters that can be configured.

###Type: 'codec'
The codec determins how messages from the websocket as a String should be turned into a javascript object.

Default:

```JAVASCRIPT
server.use('codec',function(string) {
    return JSON.parse(string);
  }, function(message) {
    return JSON.stringify(message);
  });
```

###Type: 'key'
The key determines how correlation keys will be set and got.

Default:

```JAVASCRIPT
server.use('key', function(message) {
    return message.key;
  }, function(message, key) {
    message.key = key;
  });
```

###Type: 'direction'
The direction determines which direction a message is going.  Valid directions are `'REQUEST'`, `'REPLY'`, `'MESSAGE'`, `'ERROR'`, and `'PARTIAL'`.

Default:

```JAVASCRIPT
server.use('direction', function(message) {
    return message.direction;
  }, function(message, direction) {
    message.direction = direction;
  });
```

###Type: 'type'
The type determines how to route messages.  Any string is a valid type.  This will be used when routing requests and messages (see [Event 'message'](configuration/eventListening/#event-message) and [Event 'request'](configuration/eventListening/#event-request)). No setter is necessary for type.

Default:

```JAVASCRIPT
server.use('type', function(message) {
    return message.type;
});
```