var questions = require('..');

questions()
  .set('name.first', 'What is your first name?')
  .set('name.last', 'What is your last name?')
  .ask(function (err, answers) {
    console.log(answers);
    //=> { first: 'Jon', last: 'Schlinkert' }
  });

