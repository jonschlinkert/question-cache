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
  this.queue = [];
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
  value.name = value.name || key;
  this.cache[key] = value;
  this.queue.push(value);
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
  var questions = [];
  if (typeof keys === 'function') {
    cb = keys;
    questions = this.queue;
  } else {
    keys = Array.isArray(keys) ? keys : [keys];
    var len = keys.length, i = -1;
    while (++i < len) {
      questions.push(this.get[keys[i]]);
    }
  }

  try {
    this.prompt(questions, function(answers) {
      cb(null, answers);
    });
  } catch(err) {
    cb(err);
  }
};

/**
 * Exposes the `prompt` method on [inquirer] as a convenience.
 *
 * ```js
 * questions.prompt({
 *   type: 'list',
 *   name: 'chocolate',
 *   message: 'What\'s your favorite chocolate?',
 *   choices: ['Mars', 'Oh Henry', 'Hershey']
 * }, function(answers) {
 *   //=> {chocolate: 'Hershey'}
 * });
 * ```
 *
 * @param {Object|Array} `question` Question object or array of question objects.
 * @param {Object} `callback` Callback function.
 * @api public
 */

Questions.prototype.prompt = function() {
  return this.inquirer.prompt.apply(this.inquirer, arguments);
};

/**
 * Expose `Questions`
 */

module.exports = Questions;
