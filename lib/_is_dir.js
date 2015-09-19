/**
 * @function _isDir
 * @private
 */

"use strict";

var fs = require('fs');

/** @lends _isDir */
function _isDir(filename, callback) {
    fs.stat(filename, function (err, stat) {
        callback(!err && stat.isDirectory());
    });
}

module.exports = _isDir;
