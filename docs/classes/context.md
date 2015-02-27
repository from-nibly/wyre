#Context
a context object that is given through callbacks during the `'request'` and `'message'` events.

## Message Context
```JSON
{
  message : [Object],
  type : String,
  connection : [Object:Connection]
}
```

## Request Context
`'request'` context
```JSON
{
  message : [Object],
  type : String,
  connection : [Object:Connection],
  reply : [Function],
  error : [Function],
  partial : [Function],
}
```

##message
A javascript object representing the message/request recieved.

##type
A String representing the type of message/request recieved.

##connection
A [Connection Object](classes/connection) representing the client/server connection that sent the message.

##reply(message [, options], callback)
The function used to reply to a request that has been recieved.  This will set the `key` to whatever the request's key is and `direction` to `'REPLY'` for you if you do not do it manually (see [Use](configuration/use)). This will `resolve` the promise or be sent in as `reply` in the callback on the other side (see [Callbacks and Promises](gettingStarted/callbacksPromises)). This method can only be called once.

`message`  : A javascrtipt object representing the reply response you wish to send to whomever sent the request.

`options` (optional) : three boolean flags `mask`, `binary` and `compress` can be set (this follows the behavior of [ws](https://github.com/websockets/ws/blob/master/doc/ws.md#websocketsenddata-options-callback))

`callback` : either a  [callback or defered object](gettingStarted/callbacksPromises).  The callback is called once the message has been recieved on the other end.  It will call back with either an error or nothing.

##error(message [, options], callback)
This is the same as reply except it sets the direction to `'ERROR'`. This will `fail` the promise or be sent in as `err` in the callback on the other side (see [Callbacks and Promises](gettingStarted/callbacksPromises)). This method can only be called once.

##partial(message [, options], callback)
This is the same as reply except it sets the direction to `'PARTIAL'`. This will `notify` the promise or be sent in as `partial` in the callback on the other side (see [Callbacks and Promises](gettingStarted/callbacksPromises)). This method can be called as many times as you want.
