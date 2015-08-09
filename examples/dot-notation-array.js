var Questions = require('..');
var inquirer = require('inquirer');
var questions = new Questions({inquirer: inquirer});

questions
  .set('name.first', 'What is your first name?')
  .set('name.last', 'What is your last name?')

questions.ask(['name.first', 'name.last'], function (err, answers) {
  console.log(arguments);
});
