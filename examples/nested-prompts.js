var questions = require('..')();

/**
 * Nested questions
 */

questions.prompt({
  type: 'list',
  name: 'chocolate',
  message: 'What\'s your favorite chocolate?',
  choices: ['Mars', 'Oh Henry', 'Hershey']
}, function (answers) {
  console.log();
  console.log('Great, got it:', answers);
  console.log();

  questions.prompt({
    type: 'list',
    name: 'beverage',
    message: 'And your favorite beverage?',
    choices: ['Pepsi', 'Coke', '7up', 'Mountain Dew', 'Red Bull']
  }, function (answers) {
    console.log(answers);
  });
});
