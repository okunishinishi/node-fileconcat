/**
 * @function _append
 * @private
 */

'use strict'

const path = require('path')
const fs = require('fs')
const co = require('co')

/** @lends _append */
function _append (src, dest, options) {
  function _marker (marker) {
    if (!marker) {
      return null
    }
    if (typeof marker === 'function') {
      return marker({
        src: path.relative(process.cwd(), src),
        dest: path.relative(process.cwd(), dest)
      })
    }
    return marker
  }

  return co(function * () {
    let content = yield  new Promise((resolve, reject) =>
      fs.readFile(src, (err, content) => err ? reject(err) : resolve(content))
    )
    let appendings = [
      _marker(options.before),
      content,
      _marker(options.after)
    ].filter((appending) =>!!appending)
    for (let appending of appendings) {
      yield new Promise((resolve, reject) =>
        fs.appendFile(dest, content, (err) => err ? reject(err) : resolve())
      )
    }
  })
}

module.exports = _append
