/**
 * Test for file concat.
 * Runs with nodeunit.
 */

"use strict";

var fileconcat = require('../lib/fileconcat'),
    fs = require('fs'),
    path = require('path');

var tmpDir = path.resolve(__dirname, '/../tmp');


exports['Do concat files.'] = function (test) {
    var dest = tmpDir + '/testing-concat-file.txt';
    fileconcat([
            __filename,
            require.resolve('../lib/fileconcat')
        ], dest, {
            mkdirp: true
        },
        function (err) {
            test.ifError(err);
            test.ok(fs.existsSync(dest));
            test.done();
        }
    )
};


exports['Do concat with options.'] = function (test) {
    var dest = tmpDir + '/testing-concat-file2.txt';
    fileconcat([
            __filename,
            require.resolve('../lib/fileconcat'),
            __filename
        ], dest, {
            unique: true,
            mkdirp: true,
            mode: '444',
            beforeEach: function (context) {
                return "//======= " + context.src + " ==========\n\n\n";
            }
        },
        function (err, result) {
            test.ifError(err);
            test.ok(fs.existsSync(dest));
            console.log('result', result);
            test.done();
        }
    )
};

exports['Do concat with no src.'] = function (test) {
    var dest = tmpDir + '/testing-concat-file3.txt';
    fileconcat([], dest, function (err) {
        test.ok(!!err);
        test.done();
    });
};