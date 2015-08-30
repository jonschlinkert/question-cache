var questions = require('..')();

questions
  .set('name.first', 'What is your first name?')
  .set('name.middle', 'What is your middle name?')
  .set('name.last', 'What is your last name?')
  .set('foo', 'Any thoughts about foo?')
  .set('bar', 'Any thoughts about bar?')

questions.ask(function (err, answers) {
  console.log(answers);
});
