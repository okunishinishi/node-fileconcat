/**
 * Concat multiple files into one.
 * @module fileconcat
 * @version 1.1.2
 */

"use strict";

var fileconcat = require('./fileconcat'),
    pkg = require('../package.json');

var lib = fileconcat.bind(this);

lib.fileconcat = fileconcat;
lib.version = pkg;

module.exports = lib;
