/*!
 * question-cache <https://github.com/jonschlinkert/question-cache>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
require('should');
var assert = require('assert');
var Questions = require('./');
var questions;

describe('questions', function () {
  beforeEach(function () {
    questions = new Questions();

    // questions.ask('name', function (err, res) {
    //   console.log(res);
    //   done();
    // });
  });

  it('should normalize a key string:', function () {
    questions.set('name');
    questions.get('name').should.eql({
      message: 'name?',
      name: 'name',
      type: 'input'
    });
  });

  it('should normalize key and question strings:', function () {
    questions.set('name', 'what is your name?');
    questions.get('name').should.eql({
      message: 'what is your name?',
      name: 'name',
      type: 'input'
    });
  });

  it('should normalize a question object:', function () {
    questions.set({name: 'name', message: 'what is your name?'});
    questions.get('name').should.eql({
      message: 'what is your name?',
      name: 'name',
      type: 'input'
    });
  });

  it('should resolve a stored question by key:', function () {
    questions.set({name: 'name', message: 'what is your name?'});

    questions.resolve('name').should.eql([{
      name: 'name',
      message: 'what is your name?',
      type: 'input'
    }]);
  });

  it('should resolve a new question as a string:', function () {
    var actual = questions.resolve('fofofof');
    actual.should.eql([{
      name: 'fofofof',
      message: 'fofofof?',
      type: 'input'
    }]);
  });

  it('should resolve an array of question keys:', function () {
    questions.set({name: 'name', message: 'what is your name?'});
    questions.set({name: 'username', message: 'what is your username?'});

    var actual = questions.resolve(['name', 'username']);
    actual.should.eql([{
      name: 'name',
      message: 'what is your name?',
      type: 'input'
    },
    {
      name: 'username',
      message: 'what is your username?',
      type: 'input'
    }]);
  });

  it('should resolve an array of mixed questions:', function () {
    questions.set({name: 'name', message: 'what is your name?'});
    questions.set({name: 'username', message: 'what is your username?'});

    var actual = questions.resolve([
      'name',
      'username',
      {name: 'foo'},
      'bar'
    ]);
    actual.should.eql([{
      name: 'name',
      message: 'what is your name?',
      type: 'input'
    },
    {
      name: 'username',
      message: 'what is your username?',
      type: 'input'
    },
    {
      name: 'foo',
      message: 'foo?',
      type: 'input'
    },
    {
      name: 'bar',
      message: 'bar?',
      type: 'input'
    }]);
  });
});
