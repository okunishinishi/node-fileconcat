// Concat files into one with options.
fileconcat(src, dest, {
    unique: true,
    mkdirp: true,
    mode: '444',
    beforeEach: function (context) {
        return "\n//======= " + context.src + " ==========\n";
    }
}, function (err) {
    /*...*/
});