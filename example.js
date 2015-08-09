var Questions = require('./');
var inquirer = require('inquirer');
var questions = new Questions({inquirer: inquirer});

questions
  .set('first', 'What is your first name?')
  .set('last', 'What is your last name?')
  .ask(function (err, answers) {
    console.log(answers);
    //=> { first: 'Brian', last: 'Woodward' }
  });
