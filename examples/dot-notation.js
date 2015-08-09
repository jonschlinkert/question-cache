var Questions = require('..');
var inquirer = require('inquirer');
var questions = new Questions({inquirer: inquirer});

questions.set('name.first', {
  type: 'input',
  message: 'What is your first name?',
});

questions.ask('name', function (err, answers) {
  console.log(arguments);
});
