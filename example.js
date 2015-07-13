
var Questions = require('./');
var inquirer = require('inquirer');
var questions = new Questions({inquirer: inquirer});

questions
  .set('first', {
    type: 'input',
    message: 'What is your first name?',
    default: ''
  })
  .set('last', {
    type: 'input',
    message: 'What is your last name?',
    default: ''
  })
  .ask(function (err, answers) {
    console.log(answers);
    //=> { first: 'Jon', last: 'Schlinkert' }
  });


/**
 * Nested questions
 */

questions.prompt({
  type: 'list',
  name: 'chocolate',
  message: 'What\'s your favorite chocolate?',
  choices: ['Mars', 'Oh Henry', 'Hershey']
}, function (answers) {
  questions.prompt({
    type: 'list',
    name: 'beverage',
    message: 'And your favorite beverage?',
    choices: ['Pepsi', 'Coke', '7up', 'Mountain Dew', 'Red Bull']
  }, function (answers) {
    console.log(answers);
  });
});
