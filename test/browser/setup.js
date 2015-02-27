/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var spawn = require('child_process').spawn,
  open = require('open'),
  fs = require('fs');

var p = spawn('node', ['./test/browser/server.js']);
var c;
console.log('running setup script for browser tests');

var autoKill = setTimeout(function () {
  throw new Error('The tests took too long to run');
}, 30 * 1000);

p.stdout.on('data', function (data) {
  console.log('server:',data.toString('utf8'));
});

p.on('close', function () {
  console.log('server stopped');
  if (c) {
    console.log('trying to kill chrome');
    c.kill();
    console.log('killed chrome');
  }
  console.log('stopping the tests');
  clearTimeout(autoKill);
});

if (fs.existsSync('/usr/bin/google-chrome')) {
  console.log('running with chrome!');
  c = spawn('/usr/bin/google-chrome',  ['./test/browser/lib/mocha.html']);
  c.stdout.on('data', function (data) {
    console.log('chrome:', data.toString('utf8'));
  });
}
else {
  console.log('using open');
  open('./test/browser/lib/mocha.html');
}
