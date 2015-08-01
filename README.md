fileconcat
==========

Concat multiple files into one.

<!-- Badge start -->

[![Build Status][my_travis_badge_url]][my_travis_url]
[![Code Climate][my_codeclimate_badge_url]][my_codeclimate_url]
[![Code Coverage][my_codeclimate_coverage_badge_url]][my_codeclimate_url]
[![npm version][my_npm_budge_url]][my_npm_url]

Usage
-----

**fileconcat(src, dest, callback)**

```javascript
var fileconcat = require('fileconcat');

var src = [
    'src/javascripts/lib/*.js',
    'src/javascripts/*.js'
], dest = 'dist/javascripts/all.js';
    
// Concat files into one.
fileconcat(src, dest, function (err){
    /*...*/
});
```

**fileconcat(src, dest, options, callback)**

```javascript
// Concat files into one with options.
fileconcat(src, dest, {
    unique: true,
    mkdirp: true,
    mode: '444',
    beforeEach: function (context) {
        return "\n//======= " + context.src + " ==========\n";
    }
}, function (err){
    /*...*/
});
```


Options
-------

| Key | Type | Description |
| --- | ---- | ----------- |
| unique | Boolean | Reject duplicate files. Use full when you pass multiple glob patterns. |
| mkdirp | Boolean | Make parent directories if needed. |
| mode | String | File permission |
| beforeEach | String#124;Function | String to append before each content. |
| afterEach | String#124;Function to append after each content. |

Installation
-----

```bash
npm install fileconcat --save
```


License
-------
This software is released under the [MIT License][my_license_url].



<!-- Links start -->

[nodejs_url]: http://nodejs.org/
[npm_url]: https://www.npmjs.com/
[nvm_url]: https://github.com/creationix/nvm
[bitdeli_url]: https://bitdeli.com/free
[my_bitdeli_badge_url]: https://d2weczhvl823v0.cloudfront.net/okunishinishi/node-fileconcat/trend.png
[my_repo_url]: https://github.com/okunishinishi/node-fileconcat
[my_travis_url]: http://travis-ci.org/okunishinishi/node-fileconcat
[my_travis_badge_url]: http://img.shields.io/travis/okunishinishi/node-fileconcat.svg?style=flat
[my_license_url]: https://github.com/okunishinishi/node-fileconcat/blob/master/LICENSE
[my_codeclimate_url]: http://codeclimate.com/github/okunishinishi/node-fileconcat
[my_codeclimate_badge_url]: http://img.shields.io/codeclimate/github/okunishinishi/node-fileconcat.svg?style=flat
[my_codeclimate_coverage_badge_url]: http://img.shields.io/codeclimate/coverage/github/okunishinishi/node-fileconcat.svg?style=flat
[my_apiguide_url]: http://okunishinishi.github.io/node-fileconcat/apiguide
[my_lib_apiguide_url]: http://okunishinishi.github.io/node-fileconcat/apiguide/module-fileconcat_lib.html
[my_coverage_url]: http://okunishinishi.github.io/node-fileconcat/coverage/lcov-report
[my_coverage_report_url]: http://okunishinishi.github.io/node-fileconcat/coverage/lcov-report/
[my_gratipay_url]: https://gratipay.com/okunishinishi/
[my_gratipay_budge_url]: http://img.shields.io/gratipay/okunishinishi.svg?style=flat
[my_npm_url]: http://www.npmjs.org/package/fileconcat
[my_npm_budge_url]: http://img.shields.io/npm/v/fileconcat.svg?style=flat
[my_tag_url]: http://github.com/okunishinishi/node-fileconcat/releases/tag/
[my_tag_badge_url]: http://img.shields.io/github/tag/okunishinishi/node-fileconcat.svg?style=flat