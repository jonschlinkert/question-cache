'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;
require('inquirer');
require('kind-of', 'typeOf');
require('mixin-deep', 'merge');
require('get-value', 'get');
require('has-value', 'has');
require('set-value', 'set');
require = fn;

module.exports = utils;
