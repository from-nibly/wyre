#Callbacks and Promises
In wyre anywhere you have a callback (not an event listener) you can use a promise instead.  We use jpromise for our promises but anything that fulfils the same api will do.  Here are 3 examples of using callbacks and promises on the same function.

Callback:
```js
connection.request({}, function(err, reply, progress) {
  if(data) {
    console.log('we got a reply', reply);
  }
  if(err) {
    console.log('we got an error', err);
  }
  if(progress) {
    console.log('we got a partial reply', progress);
  }
});
```

Promise:
```js
connection.request({}).done(function(data){
  console.log('we got a reply', reply);
}).fail(function(err) {
  console.log('we got an error', err);
}).progress(function(data) {
  console.log('we got a partial reply', progress);
});
```

Pre-built promise:
```js
var dfd = new p();
dfd.done(function(data){
  console.log('we got a reply', reply);
}).fail(function(err) {
  console.log('we got an error', err);
}).progress(function(data) {
  console.log('we got a partial reply', progress);
});
connection.send({}, dfd);
```