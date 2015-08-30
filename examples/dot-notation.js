var questions = require('..')();

questions.set('name.first', {
    type: 'input',
    message: 'What is your first name?',
  });

questions.ask('name', function (err, answers) {
  console.log(arguments);
});
