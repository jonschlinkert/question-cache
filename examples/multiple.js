var questions = require('..')();

questions
  .set('name.first', 'First name?')
  .set('name.last', 'Last name?')
  .set('a', 'Question A?')
  .set('b', 'Question B?')
  .set('c', 'Question C?')
  .set('x', 'Question X?')
  .set('y', 'Question Y?')
  .set('z', 'Question Z?')

questions.ask(['name', 'a'], function (err, answers) {
  console.log(answers);
});

