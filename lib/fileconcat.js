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

'use strict'

const argx = require('argx')
const co = require('co')
const path = require('path')
const arrayreduce = require('arrayreduce')
const arrayfilter = require('arrayfilter')
const expandglob = require('expandglob')
const fs = require('fs')
const filecopy = require('filecopy')
const _isDir = require('./_is_dir')
const _append = require('./_append')
const mkdirp = require('mkdirp')

/** @lends fileconcat */
function fileconcat (src, dest, options = {}) {
  let args = argx(arguments)
  if (args.pop('function')) {
    throw new Error('Callback is no more supported. Use promise interface')
  }
  options = args.pop('object') || {}
  dest = args.pop('string')
  src = args.remain().reduce(arrayreduce.arrayConcat(), [])

  if (!dest) {
    throw new Error('Destination file is required.')
  }

  let destDir = path.dirname(dest)
  let tmp = path.resolve(destDir, '.' + path.basename(dest) + '.fileconcat.' + new Date().getTime())

  return co(function * () {
    let destDirExists = yield new Promise((resolve) =>
      fs.exists(destDir, (exists) => resolve(exists))
    )
    let invalid = !destDirExists && !options.mkdirp
    if (invalid) {
      throw new Error('Destination directory not exists:' + destDir)
    }
    yield new Promise((resolve, reject) =>
      mkdirp(destDir, (err) => err ? reject(err) : resolve())
    )
    let destExists = yield new Promise((resolve) =>
      fs.exists(dest, (exists) => resolve(exists))
    )
    if (destExists) {
      let destIsDir = yield _isDir(dest)
      if (destIsDir) {
        throw new Error('Destination already exists as a directory.')
      }
      yield new Promise((resolve, reject) =>
        fs.chmod(dest, '644', (err) => err ? reject(err) : resolve())
      )
    }
    let filenames = yield expandglob(src)
    if (options.unique) {
      filenames = filenames.filter(arrayfilter.duplicateReject())
    }
    if (filenames.length === 0) {
      throw new Error('Source file not found: ' + src.join(','))
    }
    for (let filename of filenames) {
      yield _append(filename, tmp, {
        before: options.beforeEach,
        after: options.afterEach
      })
    }
    let result = yield filecopy(tmp, dest, {
      mode: options.mode
    })
    yield new Promise((resolve, reject) =>
      fs.unlink(tmp, () => resolve()) // Ignore error
    )
    return result
  })
}

module.exports = fileconcat
