/**
 * Concat multiple files into one.
 * @module fileconcat
 * @version 2.0.1
 */

'use strict'

const fileconcat = require('./fileconcat')
const pkg = require('../package.json')

let lib = fileconcat.bind(this)

lib.fileconcat = fileconcat
lib.version = pkg.version

module.exports = lib
