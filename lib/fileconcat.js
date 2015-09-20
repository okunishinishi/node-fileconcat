/**
 * Concat multiple files into one.
 * @function fileconcat
 * @param {string|string[]} src - Source file names.
 * @param {string} dest - Destination file name.
 * @param {object} [options] - Optional settings.
 * @param {boolean} options.unique - Reject duplicate files.
 * @param {boolean} options.mkdirp - Create parent directories if needed.
 * @param {string} options.mode - File permission string.
 * @param {string|function} options.beforeEach - String to append before each content.
 * @param {string|function} options.afterEach - String to append after each content.
 * @param {function} callback - Callback when done.
 */

"use strict";

var argx = require('argx'),
    async = require('async'),
    path = require('path'),
    arrayreduce = require('arrayreduce'),
    arrayfilter = require('arrayfilter'),
    expandglob = require('expandglob'),
    fs = require('fs'),
    filecopy = require('filecopy'),
    _isDir = require('./_is_dir'),
    _append = require('./_append'),
    mkdirp = require('mkdirp');

/** @lends fileconcat */
function fileconcat(src, dest, options, callback) {
    var args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};
    dest = args.pop('string');
    src = args.remain().reduce(arrayreduce.arrayConcat(), []);

    if (!dest) {
        callback(new Error('Destination file is required.'));
        return;
    }

    var destDir = path.dirname(dest);
    var tmp = path.resolve(destDir, '.' + path.basename(dest) + '.fileconcat.' + new Date().getTime());

    async.series([
        function prepareDestDir(callback) {
            fs.exists(destDir, function (exists) {
                var invalid = !exists && !options.mkdirp;
                if (invalid) {
                    callback(new Error('Destination directory not exists:' + destDir));
                } else {
                    mkdirp(destDir, callback);
                }
            });
        },
        function prepareDest(callback) {
            fs.exists(dest, function (exists) {
                if (exists) {
                    _isDir(dest, function (isDir) {
                        if (isDir) {
                            callback(new Error('Destination already exists as a directory.'));
                        } else {
                            fs.chmod(dest, '644', callback);
                        }
                    });
                } else {
                    callback(null);
                }
            }, callback);
        },
        function generateTmp(callback) {
            async.waterfall([
                function (callback) {
                    expandglob(src, callback);
                },
                function (filenames, callback) {
                    if (!!options.unique) {
                        filenames = filenames.filter(arrayfilter.duplicateReject());
                    }
                    if (filenames.length === 0) {
                        callback(new Error('Source file not found: ' + src.join(',')));
                        return;
                    }
                    async.eachSeries(filenames, function (src, callback) {
                        _append(src, tmp, {
                            before: options.beforeEach,
                            after: options.afterEach
                        }, callback);
                    }, callback);
                }
            ], callback);
        },
        function copyTmp(callback) {
            filecopy(tmp, dest, {
                mode: options.mode
            }, callback);
        }
    ], function (err, results) {
        var result = results.pop();
        fs.unlink(tmp, function () {
            callback(err, result);
        });
    });
}


module.exports = fileconcat;