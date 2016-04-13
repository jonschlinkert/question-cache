'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var utils = require('../lib/utils');
var Question = require('../lib/question');
var home = require('os-homedir');
var question;

function json(filename) {
  return require(path.resolve(home(), filename));
}

describe('Question', function() {
  beforeEach(function() {
    question = new Question('name');
  });

  describe('instance', function() {
    it('should create an instance of Question', function() {
      assert(question instanceof Question);
    });
  });
});

