var red = require('ansi-red');
var green = require('ansi-green');
var Questions = require('..');
var inquirer = require('inquirer');
var questions = new Questions({inquirer: inquirer});

/**
 * Nested questions
 */

questions.prompt({
  name: 'flavor',
  type: 'list',
  message: 'What\'s better?',
  choices: ['chocolate', 'vanilla']
}, function (answers) {
  if (answers.flavor === 'vanilla') {
    console.log(red('ohhh! I\'m, sorry, the correct answer was `chocolate`... `chocolate`'));
  } else {
    console.log(green('you are correct!'));
  }
});
