/**
 * @function _copy
 * @private
 */

"use strict";

var fs = require('fs'),
    async = require('async');

/** @lends _copy */
function _copy(src, dest, options, callback) {
    async.waterfall([
        function (callback) {
            fs.readFile(src, callback);
        },
        function (content, callback) {
            fs.writeFile(dest, content, options, callback);
        }
    ], callback);
}

module.exports = _copy;
