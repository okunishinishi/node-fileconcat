fileconcat
==========

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![Code Climate][bd_codeclimate_shield_url]][bd_codeclimate_url]
[![Code Coverage][bd_codeclimate_coverage_shield_url]][bd_codeclimate_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![bower version][bd_bower_badge_url]][bd_repo_url]

[bd_repo_url]: https://github.com/okunishinishi/node-fileconcat
[bd_travis_url]: http://travis-ci.org/okunishinishi/node-fileconcat
[bd_travis_shield_url]: http://img.shields.io/travis/okunishinishi/node-fileconcat.svg?style=flat
[bd_license_url]: https://github.com/okunishinishi/node-fileconcat/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/okunishinishi/node-fileconcat
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/okunishinishi/node-fileconcat.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/okunishinishi/node-fileconcat.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/okunishinishi/node-fileconcat
[bd_gemnasium_shield_url]: https://gemnasium.com/okunishinishi/node-fileconcat.svg
[bd_npm_url]: http://www.npmjs.org/package/fileconcat
[bd_npm_shield_url]: http://img.shields.io/npm/v/fileconcat.svg?style=flat
[bd_bower_badge_url]: https://img.shields.io/bower/v/fileconcat.svg?style=flat

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Concat multiple files into one.

<!-- Description End -->




<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/readme/01.Installation.md.hbs" Start -->

<a name="section-doc-readme-01-installation-md"></a>
Installation
-----

```bash
npm install fileconcat --save
```

<!-- Section from "doc/readme/01.Installation.md.hbs" End -->

<!-- Section from "doc/readme/02.Usage.md.hbs" Start -->

<a name="section-doc-readme-02-usage-md"></a>
Usage
----

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
}, function (err) {
    /*...*/
});
```
<!-- Section from "doc/readme/02.Usage.md.hbs" End -->

<!-- Section from "doc/readme/03.Options.md.hbs" Start -->

<a name="section-doc-readme-03-options-md"></a>
Options
-------

| Key | Type | Description |
| --- | ---- | ----------- |
| unique | Boolean | Reject duplicate files. Use full when you pass multiple glob patterns. |
| mkdirp | Boolean | Make parent directories if needed. |
| mode | String | File permission |
| beforeEach | String#124;Function | String to append before each content. |
| afterEach | String#124;Function to append after each content. |

<!-- Section from "doc/readme/03.Options.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/okunishinishi/node-fileconcat/blob/master/LICENSE).

<!-- LICENSE End -->


