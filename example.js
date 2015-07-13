
var Questions = require('./');
var questions = new Questions({
  inquirer: require('inquirer')
});

questions.set('first', {
  type: 'input',
  message: 'What is your first name?',
  default: ''
});

questions.set('last', {
  type: 'input',
  message: 'What is your last name?',
  default: ''
});

questions.ask(['first', 'last'], function (err, answers) {
  console.log(answers);
  //=> { first: 'Jon', last: 'Schlinkert' }
});
