/**
 * @function _isDir
 * @private
 */

'use strict'

const fs = require('fs')

/** @lends _isDir */
function _isDir (filename) {
  return new Promise((resolve, reject) =>
    fs.stat(filename, (err, stat) =>
      err ? reject(err) : resolve(stat.isDirectory())
    )
  )
}

module.exports = _isDir;
