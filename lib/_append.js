/**
 * @function _append
 * @private
 */

"use strict";

var path = require('path'),
    fs = require('fs'),
    async = require('async');

/** @lends _append */
function _append(src, dest, options, callback) {
    function _marker(marker) {
        if (!marker) {
            return null;
        }
        if (typeof(marker) === 'function') {
            return marker({
                src: path.relative(process.cwd(), src),
                dest: path.relative(process.cwd(), dest)
            });
        }
        return marker;
    }

    async.waterfall([
        function (callback) {
            fs.readFile(src, callback);
        },
        function (content, callback) {
            async.eachSeries([
                _marker(options.before),
                content,
                _marker(options.after)
            ], function (content, callback) {
                if (content) {
                    fs.appendFile(dest, content, callback);
                } else {
                    callback(null);
                }
            }, callback);
        }
    ], callback);
}

module.exports = _append;
