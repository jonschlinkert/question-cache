
var Questions = require('./');
var inquirer = require('inquirer');
var questions = new Questions({inquirer: inquirer});

questions.set('name', {
  type: 'input',
  message: 'What is your name?',
  default: ''
});

questions.set('repo', {
  type: 'input',
  message: 'What is the repo URL?',
  default: ''
});

questions.ask(['name', 'repo'], function (err, answers) {
  console.log(answers);
  //=> { repo: 'foo', name: 'bar' }
});
