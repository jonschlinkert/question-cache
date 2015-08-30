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


questions.ask('name.first', function (err, answers) {
  // console.log(answers);
  //=> {name: { first: 'Brian' }}

  questions.ask('name.last', function (err, answers) {
    // console.log(answers);
    //=> {name: { last: 'Woodward' }}
  });
});
