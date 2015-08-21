/*!
 * question-cache <https://github.com/jonschlinkert/question-cache>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var lazy = require('lazy-cache')(require);
lazy('get-value', 'get');
lazy('has-value', 'has');
lazy('set-value', 'set');

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
  define(this, 'inquirer', this.options.inquirer);
  delete this.options.inquirer;
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
  if (typeof value === 'undefined') {
    value = key;
    key = 'key_' + this.queue.length;
  }
  if (typeof value === 'string') {
    value = {message: value};
  }
  value.type = value.type || 'input';
  value.name = value.name || key;
  lazy.set(this.cache, key, value);
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
  return lazy.get(this.cache, key);
};

/**
 * Return true if the given question name is stored on
 * question-cache.
 *
 * ```js
 * var exists = questions.has('name');
 * //=> true or false
 * ```
 *
 * @param {String} `key` Unique question id.
 * @param {Object} `value` Question object that follows [inquirer] conventions.
 * @api public
 */

Questions.prototype.has = function(key) {
  return lazy.has(this.cache, key);
};

/**
 * Returns an array of question objects from an array of keys. Keys
 * may use dot notation.
 *
 * @param  {Array} `keys` Question names or object paths.
 * @return {Array} Array of question objects.
 * @api public
 */

Questions.prototype.resolve = function(keys) {
  return arrayify(keys).reduce(function (acc, key) {
    var question = {};
    if (isObject(key)) {
      question = key;
    } else {
      question = this.get(key);
      if (!question && typeof key === 'string') {
        question = this.toQuestion(key);
      }
    }

    if (!lazy.has(question, 'type')) {
      for (var prop in question) {
        this.set(prop, question[prop]);
        var val = this.get(prop);

        if (question.hasOwnProperty(prop)) {
          acc.push(val);
        }
      }
    } else {
      acc.push(question);
    }
    return acc;
  }.bind(this), []);
};

/**
 * Create a question object from a string. Uses the `input` question type,
 * and does the following basic normalization:
 *
 *   - when `foo` is passed, a `?` is added to the question. e.g. `foo?`
 *   - when `foo?` is passed, `?` is removed on the question key, so the answer to `foo?` is
 *   `{foo: 'bar'}`
 *
 * @param  {String} `key`
 * @return {Object} Returns a question object.
 * @api public
 */

Questions.prototype.toQuestion = function(key) {
  var msg = key;
  if (msg.slice(-1) !== '?') {
    msg += '?';
  } else {
    key = key.slice(0, key.length - 1);
  }
  this.set(key, {message: msg});
  return this.get(key);
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
  if (isObject(keys)) keys = [keys];

  var questions = [];
  if (typeof keys === 'function') {
    cb = keys;
    questions = this.queue;
  } else {
    questions = this.resolve(keys);
  }

  if (questions.length === 0) {
    return cb(new Error('no questions found.'));
  }

  try {
    this.prompt(questions, function(answers) {
      cb(null, setEach({}, answers));
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
 * Utility for setting values on properties defined using
 * dot notation (object paths).
 *
 * @param {object} `obj` Object to store values on.
 * @param {object} `answers` Answers object.
 */

function setEach(obj, answers) {
  for (var key in answers) {
    if (answers.hasOwnProperty(key)) {
      lazy.set(obj, key, answers[key]);
    }
  }
  return obj;
}

/**
 * Utility for casting a value to an array.
 */

function arrayify(val) {
  return Array.isArray(val) ? val : [val];
}

/**
 * Utility for casting a value to an array.
 */

function isObject(val) {
  return val && typeof val === 'object'
    && !Array.isArray(val);
}

/**
 * Utility for definining a non-enumerable property.
 */

function define(obj, prop, val) {
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
}

/**
 * Expose `Questions`
 */

module.exports = Questions;
