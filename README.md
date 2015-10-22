# question-cache [![NPM version](https://badge.fury.io/js/question-cache.svg)](http://badge.fury.io/js/question-cache)

> A wrapper around inquirer that makes it easy to create and selectively reuse questions.

## Example

```js
var questions = require('question-cache');

questions()
  .set('first', 'What is your first name?')
  .set('last', 'What is your last name?')
  .ask(function (err, answers) {
    console.log(answers);
  });
```

**Screen capture**

<img width="669" alt="screen shot 2015-07-13 at 8 05 20 am" src="https://cloud.githubusercontent.com/assets/383994/8649221/00ecc908-2936-11e5-88d2-b1ab75a53ba0.png">

See the [working examples](./examples).

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i question-cache --save
```

## Basic Usage

See the [working examples](./examples).

```js
var questions = require('question-cache')();

// question type "input" is used by default
questions
  .set('name', 'What is your name?')
  .ask('name', function (err, answers) {
    console.log(answers);
  });
```

**[inquirer](https://github.com/sboudrias/Inquirer.js)**

You may optionally pass your own instance of inquirer to the constructor:

```js
// on the options
var questions = require('question-cache');
var questions = new Questions({
  inquirer: require('inquirer')
});

// or if inquirer is the only thing passed
var questions = new Questions(require('inquirer'));
```

## Getting started

question-cache is a wrapper around [inquirer](https://github.com/sboudrias/Inquirer.js). If you have any issues related to the interface (like scrolling, colors, styling, etc), then please create an issue on the [inquirer](https://github.com/sboudrias/Inquirer.js) project.

**Asking questions**

The simplest way to ask a question is by passing a string and a callback:

```js
questions.ask('name', function (err, answers) {
  console.log(answers);
});
```

**Ask all stored questions**

```js
questions.ask(function (err, answers) {
  console.log(answers);
});
```

## Table of contents

See the [working examples](./examples).

- [API](#api)
- [Dot notation](#dot-notation)
  * [Dot notation usage](#dot-notation-usage)
    + [ask one](#ask-one)
    + [ask all "name" questions](#ask-all--name--questions)
    + [array of questions](#array-of-questions)
    + [ask all questions](#ask-all-questions)
    + [nested questions](#nested-questions)
- [More examples](#more-examples)
  * [Mixture of dot notation and non-dot-notation](#mixture-of-dot-notation-and-non-dot-notation)
- [Thank you](#thank-you)
- [Related](#related)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## API

### [Questions](index.js#L25)

Create an instance of `Questions` with the given `options`.

**Params**

* `options` **{Object}**: Pass your instance of [inquirer](https://github.com/sboudrias/Inquirer.js)on the `inquirer` option.

**Example**

```js
var inquirer = require('inquirer')
var questions = new Questions({inquirer: inquirer});
```

### [.set](index.js#L61)

Store a question object by `key`.

**Params**

* `key` **{String}**: Unique question id.
* `value` **{Object}**: Question object that follows [inquirer](https://github.com/sboudrias/Inquirer.js)conventions.

**Example**

```js
questions.set('name', {
  type: 'input',
  message: 'Project name?',
  default: 'undefined'
});
```

### [.get](index.js#L103)

Get a question by `key`.

**Params**

* `key` **{String}**: Unique question id.
* `value` **{Object}**: Question object that follows [inquirer](https://github.com/sboudrias/Inquirer.js)conventions.

**Example**

```js
questions.get('name');
//=> {type: 'input', message: 'What is your name?', default: ''}
```

### [.has](index.js#L121)

Return true if the given question name is stored on question-cache.

**Params**

* `key` **{String}**: Unique question id.
* `value` **{Object}**: Question object that follows [inquirer](https://github.com/sboudrias/Inquirer.js)conventions.

**Example**

```js
var exists = questions.has('name');
//=> true or false
```

### [.resolve](index.js#L134)

Returns an array of question objects from an array of keys. Keys
may use dot notation.

**Params**

* `keys` **{Array}**: Question names or object paths.
* `returns` **{Array}**: Array of question objects.

### [.toQuestion](index.js#L213)

Create a question object from a string. Uses the `input` question type, and does the following basic normalization:

* when `foo` is passed, a `?` is added to the question. e.g. `foo?`
* when `foo?` is passed, `?` is removed on the question key, so the answer to `foo?` is
`{foo: 'bar'}`

**Params**

* `key` **{String}**
* `returns` **{Object}**: Returns a question object.

### [.ask](index.js#L248)

Ask a question or array of questions.

**Params**

* `key` **{String}**: Unique question id.
* `value` **{Object}**: Question object that follows [inquirer](https://github.com/sboudrias/Inquirer.js)conventions.

**Example**

```js
questions.ask(['name', 'homepage']);
//=> { name: 'foo', homepage: 'https://github/foo' }
```

### [.prompt](index.js#L291)

Exposes the `prompt` method on [inquirer](https://github.com/sboudrias/Inquirer.js)as a convenience.

**Params**

* `question` **{Object|Array}**: Question object or array of question objects.
* `callback` **{Object}**: Callback function.

**Example**

```js
questions.prompt({
  type: 'list',
  name: 'chocolate',
  message: 'What\'s your favorite chocolate?',
  choices: ['Mars', 'Oh Henry', 'Hershey']
}, function(answers) {
  //=> {chocolate: 'Hershey'}
});
```

## Dot notation

See the [working examples](./examples).

Qestions may be stored using object-path notatation (e.g. `a.b.c`).

**Example**

All of the following will be stored on the `name` object:

```js
questions
  .set('name.first', 'What is your first name?')
  .set('name.middle', 'What is your middle name?')
  .set('name.last', 'What is your last name?')
```

**Dot notation usage**

When stored using dot-notation, there are a few different ways questions that may be asked.

### Dot notation usage

#### ask one

Ask a single `name` question:

```js
questions.ask('name.first', function (err, answers) {
  console.log(answers);
});
```

#### ask all "name" questions

Ask all `name` questions, `first`, `middle` and `last`:

```js
questions.ask('name', function (err, answers) {
  console.log(answers);
});
```

#### array of questions

Ask specific questions on `name`:

```js
questions.ask(['name.first', 'name.last'], function (err, answers) {
  console.log(answers);
});
```

#### ask all questions

Ask specific questions on `name`:

```js
questions
  .set('name.first', {
    message: 'What is your first name?',
  })
  .set('name.last', {
    message: 'What is your last name?',
  })
  .set('foo', {
    message: 'Any thoughts about foo?',
  })

questions.ask(['name', 'foo'], function (err, answers) {
  console.log(answers);
});
```

#### nested questions

Ask one question at a time, based on feedback:

```js
questions.ask('name.first', function (err, answers) {
  console.log(answers);
  //=> {name: { first: 'Brian' }}

  questions.ask('name.last', function (err, answers) {
    console.log(answers);
    //=> {name: { last: 'Woodward' }}
  });
});
```

## More examples

### Mixture of dot notation and non-dot-notation

Given you have the following questions:

```js
questions
  .set('name.first', 'What is your first name?')
  .set('name.last', 'What is your last name?')
  .set('foo', 'Any thoughts about foo?')
  .set('bar', 'Any thoughts about bar?')
```

The following will ask questions: `name.first`, `name.last` and `foo`

```js
questions.ask(['name', 'foo'], function (err, answers) {
  console.log(answers);
});
```

## Thank you

[@sboudrias](https://github.com/sboudrias), I appreciate having [inquirer](https://github.com/sboudrias/Inquirer.js) and I appreciate you for creating it! All that time and effort you put into it makes my life easier. Thank you!

## Related

* [ask-for-github-auth](https://www.npmjs.com/package/ask-for-github-auth): Prompt a user for their github authentication credentials and save the results. | [homepage](https://github.com/doowb/ask-for-github-auth)
* [ask-once](https://www.npmjs.com/package/ask-once): Only ask a question one time and store the answer. | [homepage](https://github.com/doowb/ask-once)
* [generate](https://www.npmjs.com/package/generate): Project generator, for node.js. | [homepage](https://github.com/generate/generate)
* [question-helper](https://www.npmjs.com/package/question-helper): Template helper that asks a question in the command line and resolves the template with… [more](https://www.npmjs.com/package/question-helper) | [homepage](https://github.com/doowb/question-helper)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/question-cache/issues/new).

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on October 22, 2015._