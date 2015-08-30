var questions = require('..')();

questions
  .set('name.first', {
    type: 'input',
    message: 'What is your first name?',
  })
  .set('name.last', {
    type: 'input',
    message: 'What is your last name?',
  })
  .set('foo', {
    type: 'input',
    message: 'Any thoughts about foo?',
  })

questions.ask(['name', 'foo'], function (err, answers) {
  console.log(answers);
});
