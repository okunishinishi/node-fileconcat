'use strict'

const fileconcat = require('fileconcat')

let src = [
  'src/javascripts/lib/*.js',
  'src/javascripts/*.js'
]
let dest = 'dist/javascripts/all.js'

// Concat files into one.
fileconcat(src, dest).then(() => {
  /* ... */
})
