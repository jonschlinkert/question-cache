var questions = require('./');

questions()
  .set('first', 'What is your first name?')
  .set('last', 'What is your last name?')
  .ask(function (err, answers) {
    console.log(answers);
  });

