var questions = require('..')();

questions
  .ask('name', function (err, answers) {
    console.log(answers);
  });
