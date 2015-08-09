var Questions = require('..');
var inquirer = require('inquirer');
var questions = new Questions({inquirer: inquirer});

questions.ask('name', function (err, answers) {
  console.log(answers);
});
