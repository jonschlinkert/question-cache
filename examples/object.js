var Questions = require('..');
var inquirer = require('inquirer');
var questions = new Questions({inquirer: inquirer});

questions.set('name.first', 'What is your first name?');

questions.ask('What\'s your name?', function (err, answers) {
  console.log(answers);
});
