var questions = require('..')();

questions
  .set('name.first', 'What is your first name?')
  .ask('What\'s your name?', function (err, answers) {
    console.log(answers);
  });
