/**
 * Test for file concat.
 * Runs with mocha.
 */

'use strict'

const fileconcat = require('../lib/fileconcat')
const fs = require('fs')
const co = require('co')
const path = require('path')
const assert = require('assert')

let tmpDir = path.resolve(__dirname, '/../tmp')

describe('file concat', () => {
  it('Do concat files.', () => co(function * () {
    let dest = tmpDir + '/testing-concat-file.txt'
    yield fileconcat([
      __filename,
      require.resolve('../lib/fileconcat')
    ], dest, {
      mkdirp: true
    })
    assert.ok(fs.existsSync(dest))
  }))

  it('Do concat with options.', () => co(function * () {
    let dest = tmpDir + '/testing-concat-file2.txt'
    let result = yield fileconcat([
      __filename,
      require.resolve('../lib/fileconcat'),
      __filename
    ], dest, {
      unique: true,
      mkdirp: true,
      mode: '444',
      beforeEach: function (context) {
        return '//======= ' + context.src + ' ==========\n\n\n'
      }
    })
    assert.ok(fs.existsSync(dest))
    console.log('result', result)
  }))

  it('Do concat with no src.', () => co(function * () {
    let dest = tmpDir + '/testing-concat-file3.txt'
    try {
      yield fileconcat([], dest)
    } catch (err) {
      assert.ok(!!err)
    }
  }))
})

/* global describe, it */
