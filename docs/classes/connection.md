#Connection
A connection object that represents the connection to either the server or the client on the other side of the websocket.
```json
{
    id : [String],
    send : [Function],
    request : [Function],
    close : [Function]
}
```

##id
a String containing a version 4 uuid that is created when the connection is established.
This is used to keep track of different clients.

##send(message [, options], callback)
 a function used to send a message through the websocket connection

`message` : a javascript object to be serialized before sending over the websocket.

`options` (optional) : three boolean flags `mask`, `binary` and `compress` can be set (this follows the behavior of [ws](https://github.com/websockets/ws/blob/master/doc/ws.md#websocketsenddata-options-callback))

`callback` : either a  [callback or defered object](gettingStarted/callbacksPromises/).  The callback is called once the message has been recieved on the other end.  It will call back with either an error or nothing.

Example:
```js
connection.send({}, function(err) {
  if(err) {
    console.log('there was an error', err);
  }
  console.log('message sent');
});
```

##request(request, [, options], callback)
a function used to send a request message.  This is mostly a shortcut for adding a request key, and a direction to the message before calling `send()`

`request` : a javascript object to be serialized before sending over the websocket.  the `direction` property will be set to `'REQUEST'` on its way out and the `key` property will be set to a version4 uuid if there is none present.

`options` : same as `send()` method.

`callback`: a [callback or defered object](gettingStarted/callbacksPromises/). The callback is called once a message with a `direction` property of `'REPLY'` has been sent back with a matching `key` property to the request message.  It will be called with an error, a reply, or a partial reply.  Only one reply or one error will be sent to the callback however an infinite number of partial replys may be sent to the callback.

Example request:
```json
{
  "question" : "how are you doing?",
  "key" : "34825995-d7ee-434d-a665-1e62ad2e8a0e",
  "direction" : "REQUEST"
}
```

Example reply:
```json
{
  "answer" : "good, and you?",
  "key" : "34825995-d7ee-434d-a665-1e62ad2e8a0e",
  "direction" : "REPLY"
}
```

Example:
```js
connection.request({}, function(err, reply, partial) {
  if(err) {
    console.log('there was an error', err);
  }
  if(reply) {
    console.log('request has been replied to', reply);
  }
  if(partial) {
    console.log('a piece of the reply has been sent back', partial);
  }
});
```

##close(code, reason, callback)
used to close the connectoin to the server.

`code`: one of the websocket close codes specified in the [RFC](https://tools.ietf.org/html/rfc6455#section-7.4.1) for websockets.

`reason`: any string as defined in the [RFC](https://tools.ietf.org/html/rfc6455#section-7.1.6) for websockets.

`callback` : a [callback or defered object](gettingStarted/callbacksPromises/). This will return an error or nothing if everything went well.
