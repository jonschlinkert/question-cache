var questions = require('..');

questions()
  .set('name.first', 'What is your first name?')
  .set('name.last', 'What is your last name?')
  .ask(['name.first', 'name.last'], function (err, answers) {
    console.log(arguments);
  });
