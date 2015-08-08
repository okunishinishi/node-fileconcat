var fileconcat = require('fileconcat');

var src = [
    'src/javascripts/lib/*.js',
    'src/javascripts/*.js'
], dest = 'dist/javascripts/all.js';

// Concat files into one.
fileconcat(src, dest, function (err){
    /*...*/
});