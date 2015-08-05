#Event Listening
In wyre you react to things that happen on the server or client with callbacks.  Everything in the event listening is configured through the function `on`.

##(server||client).on(event [, type], callback)
configures the current event listener for `event` with the `callback`.

##Events
depending on what you put in for event the event listener will be called at different times.

##Event: 'connection'
Is called whenever a new client connects to the server.  This event is only fired on the serverside as the `connect()` function handles the connection with the client.

Example:
```js
server.on('connection', function(connection) {
  console.log('new client connected!', connection.id);
});
```
`connection`: a [Connection](classes/connection) object that is created by wyre for contextual information purposes

##Event: 'message'
Is called on either the server or the client whenever a message is recieved with a `direction` property that is either `undefined` or `'MESSAGE'`

Example:
```js
server.on('message', function(context) {
  console.log('recieved a new message', context.message);
});
```
`context` : a [MessageContext](classes/context) object that is created by wyre for contextual information.

##Event: 'request'
Is called on either the server or the client whenever a request is recieved with a `direction` property that is `'REQUEST'`

Example:
```js
server.on('message', function(context) {
  console.log('recieved a new message', context.message);
});
```
`context` : a [MessageContext](classes/context) object that is created by wyre for contextual information.

##Event: 'close'
Is called on both the server and client side when either side closes the connection.

Example:
```js
client.on('close', function(code, reason, connection) {
    console.log('client with id', connection.id, 'closed because of', reason, code);
});
```
`code`: one of the websocket close codes specified in the [RFC](https://tools.ietf.org/html/rfc6455#section-7.4.1) for websockets.

`reason`: any string as defined in the [RFC](https://tools.ietf.org/html/rfc6455#section-7.1.6) for websockets.

`connection`: a [Connection](classes/connection) object that is created by wyre for contextual information.

##Event: 'error'
Is called whenever an uncaught erorr is thrown.

Example:
```js
client.on('error', function(error) {
    console.log('there was a websocket error', error);
});
```

`error` : An Error object.