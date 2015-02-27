/*!
 * wyre: the new way to do websockets
 * Copyright(c) 2015 Jordan S Davidson <thatoneemail@gmail.com>
 * MIT Licensed
 */
var assert = require('assert'),
  p = require('jpromise'),
  wrapper = require('../../lib/util/callbackWrapper.js');

describe('callback wrapper', function() {

  it('should call when it is resolved', function(done) {
    wrapper(function(err, data, progress) {
      assert(!err);
      assert(data);
      assert(!progress)
      done();
    }).resolve('testing');
  });

  it('should call when it is rejected', function(done) {
    wrapper(function(err, data, progress) {
      assert(err);
      assert(!data);
      assert(!progress);
      done();
    }).reject('error');
  });

  it('should call when it is progressed', function(done) {
    wrapper(function(err, data, progress) {
      assert(!err);
      assert(!data);
      assert(progress);
      done();
    }).notify('progress');
  });

  it('should call done when it is resolved', function(done) {
    var dfd = wrapper();
    dfd.done(function(data) {
      assert(data);
      done();
    }).fail(function(err) {
      done('should not have called this');
    }).progress(function() {
      done('should not have called this');
    });
    dfd.resolve('testing');
  });

  it('should call fail when it is rejected', function(done) {
    var dfd = wrapper();
    dfd.done(function(data) {
      done('should not have called this');
    }).fail(function(err) {
      assert(err);
      done();
    }).progress(function() {
      done('should not have called this');
    });
    dfd.reject('testing');
  });

  it('should call progress when it is rejected', function(done) {
    var dfd = wrapper();
    dfd.done(function(data) {
      done('should not have called this');
    }).fail(function(err) {
      done('should not have called this');
    }).progress(function(data) {
      assert(data);
      done();
    });
    dfd.notify('testing');
  });

  it('should call done when it is resolved and passed in', function(done) {
    var dfd = new p();
    wrapper(dfd);
    dfd.done(function(data) {
      assert(data);
      done();
    }).fail(function(err) {
      done('should not have called this');
    }).progress(function() {
      done('should not have called this');
    });
    dfd.resolve('testing');
  });

  it('should call fail when it is rejected and passed in', function(done) {
    var dfd = new p();
    wrapper(dfd);
    dfd.done(function(data) {
      done('should not have called this');
    }).fail(function(err) {
      assert(err);
      done();
    }).progress(function() {
      done('should not have called this');
    });
    dfd.reject('testing');
  });

  it('should call progress when it is rejected and passed in', function(done) {
    var dfd = new p();
    wrapper(dfd);
    dfd.done(function(data) {
      done('should not have called this');
    }).fail(function(err) {
      done('should not have called this');
    }).progress(function(data) {
      assert(data);
      done();
    });
    dfd.notify('testing');
  });

});