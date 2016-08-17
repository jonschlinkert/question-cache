'use strict';

var Store = require('data-store');
var hints = new Store('example-hints-store');
var questions = require('./');

questions()
  .use(function() {
    this.on('ask', function(val, key, question) {
      question.default = hints.get(key);
    });
    this.on('answer', function(val, key) {
      hints.set(key, val);
    });
  })
  .set('first', 'What is your first name?')
  .set('last', 'What is your last name?')
  .set('foo', 'What is foo?', {
    when: function() {
      // console.log(arguments)
    }
  })
  .ask(function(err, answers) {
    console.log(answers);
  });

