'use strict';

require('mocha');
var os = require('os');
var path = require('path');
var assert = require('assert');
var Questions = require('..');
var intercept = require("intercept-stdout");
var utils = require('../lib/utils');
var bddStdin = require('bdd-stdin');
var questions;

function interception(msg) {
  var intercepted = false;
  return intercept(function(str) {
    if (intercepted) {
      if (str.indexOf('[?25h') === 1) {
        intercepted = false;
      }
      return '';
    }
    if (str.indexOf(msg) !== -1) {
      intercepted = true;
      return '';
    }
    return str;
  });
}

describe('Questions', function() {
  beforeEach(function() {
    questions = new Questions({debug: true});
  });

  afterEach(function() {
    questions.clearAnswers();
  });

  describe('ask', function() {
    it('should ask a question', function(cb) {
      var intercepted = interception('foo');
      questions.set('foo');
      bddStdin('bar\n');

      questions.ask('foo', function(err, answers) {
        if (err) return cb(err);
        assert.equal(answers.foo, 'bar');
        intercepted();
        cb();
      });
    });
  });

  describe('options.force', function() {
    it('should not ask the same question more than once', function(cb) {
      var intercepted = interception('foo');

      questions.set('foo');
      bddStdin('bar\n');
      questions.ask('foo', function(err, answers) {
        if (err) return cb(err);
        assert.equal(answers.foo, 'bar');

        bddStdin('qux\n');
        questions.ask('foo', function(err, answers) {
          if (err) return cb(err);
          assert.equal(answers.foo, 'bar');
          intercepted();
          cb();
        });
      });
    });

    it('should always ask the question when force is true', function(cb) {
      var intercepted = interception('foo');

      questions.set('foo');
      bddStdin('bar\n');
      questions.ask('foo', function(err, answers) {
        if (err) return cb(err);
        assert.equal(answers.foo, 'bar');

        bddStdin('qux\n');
        questions.ask('foo', {force: true}, function(err, answers) {
          if (err) return cb(err);
          assert.equal(answers.foo, 'qux');
          intercepted();
          cb();
        });
      });
    });
  });

  describe('options.skip', function() {
    it('should skip questions when options.skip is true', function(cb) {
      questions.set('foo', {skip: true});
      bddStdin('bar\n');
      questions.ask('foo', function(err, answers) {
        if (err) return cb(err);

        var question = questions.get('foo');
        assert.equal(question.skipped, true);
        assert.equal(typeof answers.foo, 'undefined');
        cb();
      });
    });
  });

  describe('options.required', function() {
    it('should repeat a question until it has been answered', function(cb) {
      var intercepted = interception('foo');

      questions.set('foo', {required: true});
      var count = 0;

      questions.on('ask', function(val, key, question, answers) {
        if (count < 5) {
          count++;
          bddStdin('\n');
        } else {
          answers[key] = 'abc';
        }
      });

      questions.ask('foo', function(err, answers) {
        if (err) return cb(err);

        assert.equal(answers.foo, 'abc');
        assert.equal(count, 5);
        intercepted();
        cb();
      });
    });
  });
});
