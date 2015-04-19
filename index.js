/*!
 * question-cache <https://github.com/jonschlinkert/question-cache>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Create an instance of `Questions` with the
 * given `options`.
 *
 * ```js
 * var inquirer = require('inquirer')
 * var questions = new Questions({inquirer: inquirer});
 * ```
 *
 * @param {Object} `options` Pass your instance of [inquirer] on the `inquirer` option.
 * @api public
 */

function Questions(options) {
  this.options = options || {};
  this.inquirer = this.options.inquirer;
  this.cache = {};
}

/**
 * Store a question object by `key`.
 *
 * ```js
 * questions.set('name', {
 *   type: 'input',
 *   message: 'Project name?',
 *   default: 'undefined'
 * });
 * ```
 *
 * @param {String} `key` Unique question id.
 * @param {Object} `value` Question object that follows [inquirer] conventions.
 * @api public
 */

Questions.prototype.set = function(key, value) {
  this.cache[key] = value;
  return this;
};

/**
 * Get a question by `key`.
 *
 * ```js
 * questions.get('name');
 * //=> {type: 'input', message: 'What is your name?', default: ''}
 * ```
 *
 * @param {String} `key` Unique question id.
 * @param {Object} `value` Question object that follows [inquirer] conventions.
 * @api public
 */

Questions.prototype.get = function(key) {
  return this.cache[key];
};

/**
 * Ask a question or array of questions.
 *
 * ```js
 * questions.ask(['name', 'homepage']);
 * //=> { name: 'foo', homepage: 'https://github/foo' }
 * ```
 *
 * @param {String} `key` Unique question id.
 * @param {Object} `value` Question object that follows [inquirer] conventions.
 * @api public
 */

Questions.prototype.ask = function(keys, cb) {
  keys = Array.isArray(keys) ? keys : [keys];
  var len = keys.length, i = 0;
  var questions = [];

  while (len--) {
    var key = keys[i++];
    var question = this.cache[key];
    question.name = key;
    questions.push(question);
  }

  this.inquirer.prompt(questions, function(answers) {
    try {
      cb(null, answers);
    } catch(err) {
      return cb(err);
    }
  });
};

/**
 * Expose `Questions`
 */

module.exports = Questions;
