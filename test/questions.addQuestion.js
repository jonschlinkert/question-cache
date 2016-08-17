'use strict';

require('mocha');
var os = require('os');
var path = require('path');
var assert = require('assert');
var utils = require('../lib/utils');
var Questions = require('..');
var questions;

describe('Question', function() {
  beforeEach(function() {
    questions = new Questions();
  });

  describe('set', function() {
    describe('properties', function() {
      it('should add a property to "questions"', function() {
        questions.addQuestion('foo');
        assert(questions.cache.foo);
      });
    });

    describe('set > key as a string', function() {
      it('should set the question name', function() {
        questions.addQuestion('foo');
        assert.equal(questions.cache.foo.name, 'foo');
      });

      it('should set the question name', function() {
        questions.addQuestion('foo');
        assert.equal(questions.cache.foo.name, 'foo');
      });

      it('should set the question options.message', function() {
        questions.addQuestion('foo');
        assert.equal(questions.cache.foo.message, 'foo');
      });

      it('should set the question type', function() {
        questions.addQuestion('foo');
        assert.equal(questions.cache.foo.type, 'input');
      });
    });

    describe('set > key as an object', function() {
      it('should set the question name', function() {
        questions.addQuestion({name: 'foo'});
        assert.equal(questions.cache.foo.name, 'foo');
      });

      it('should set the question name', function() {
        questions.addQuestion({name: 'foo'});
        assert.equal(questions.cache.foo.name, 'foo');
      });

      it('should set the question options.message', function() {
        questions.addQuestion({name: 'foo'});
        assert.equal(questions.cache.foo.message, 'foo');
      });

      it('should set the question type', function() {
        questions.addQuestion({name: 'foo'});
        assert.equal(questions.cache.foo.type, 'input');
      });
    });

    describe('set > key and value as objects', function() {
      it('should set the question name', function() {
        questions.addQuestion({name: 'foo'}, {message: 'bar'});
        assert.equal(questions.cache.foo.name, 'foo');
      });

      it('should set the question name', function() {
        questions.addQuestion({name: 'foo'}, {message: 'bar'});
        assert.equal(questions.cache.foo.name, 'foo');
      });

      it('should set the question options.message', function() {
        questions.addQuestion({name: 'foo'}, {message: 'bar'});
        assert.equal(questions.cache.foo.message, 'bar');
      });

      it('should set the question type', function() {
        questions.addQuestion({name: 'foo'}, {message: 'bar', type: 'baz'});
        assert.equal(questions.cache.foo.type, 'baz');
      });
    });

    describe('set > value as a string', function() {
      it('should set the question options.message', function() {
        questions.addQuestion('foo', 'bar');
        assert.equal(questions.cache.foo.message, 'bar');
      });

      it('should set the question type', function() {
        questions.addQuestion('foo', 'bar');
        assert.equal(questions.cache.foo.type, 'input');
      });
    });

    describe('set > value as an object', function() {
      it('should set the question options.message', function() {
        questions.addQuestion('foo', { message: 'bar' });
        assert.equal(questions.cache.foo.message, 'bar');
      });

      it('should set the question type', function() {
        questions.addQuestion('foo', { message: 'bar' });
        assert.equal(questions.cache.foo.type, 'input');
      });
    });

    describe('set > options object', function() {
      it('should set force=true on question options', function() {
        questions.addQuestion('foo', { message: 'bar' }, { force: true });
        assert.equal(questions.cache.foo.options.force, true);
      });

      it('should set save=false on question options', function() {
        questions.addQuestion('foo', { message: 'bar' }, { save: false });
        assert.equal(questions.cache.foo.options.save, false);
      });
    });
  });
});

