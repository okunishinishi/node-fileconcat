/**
 * Concat multiple files into one.
 * @function fileconcat
 * @param {string|string[]} src - Source file names.
 * @param {string} dest - Destination file name.
 * @param {object} [options] - Optional settings.
 * @param {boolean} options.unique - Reject duplicate files.
 * @param {boolean} options.mkdirp - Create parent directories if neede.
 * @param {string} options.mode - File permission string.
 * @param {function} callback - Callback when done.
 */

"use strict";

var argx = require('argx'),
    async = require('async'),
    path = require('path'),
    glob = require('glob'),
    fs = require('fs'),
    mkdirp = require('mkdirp');

/** @lends fileconcat */
function fileconcat(src, dest, options, callback) {
    var args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};
    dest = args.pop('string');
    src = args.remain().reduce(_concat, []);

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
                            console.log(dest);
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
                    async.concatSeries([].concat(src), glob, callback);
                },
                function (src, callback) {
                    if (!!options.unique) {
                        src = _unique(src);
                    }
                    async.eachSeries(src, function (src, callback) {
                        _append(src, tmp, callback);
                    }, callback);
                }
            ], callback);
        },
        function copyTmp(callback) {
            _copy(tmp, dest, {
                mode: options.mode
            }, callback);
        }
    ], function (err) {
        fs.unlink(tmp, function () {
            callback(err);
        });
    });
}

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


function _append(src, dest, callback) {
    async.waterfall([
        function (callback) {
            fs.readFile(src, callback);
        },
        function (content, callback) {
            fs.appendFile(dest, content, callback);
        }
    ], callback);
}

function _unique(array) {
    return array.filter(function (entry, i, array) {
        return array.indexOf(entry) === i;
    });
}

function _concat(a, b) {
    return a.concat(b);
}

function _isDir(filename, callback) {
    fs.stat(filename, function (err, stat) {
        callback(!err && stat.isDirectory());
    });
}

module.exports = fileconcat;