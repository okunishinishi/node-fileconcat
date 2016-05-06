'use strict'

// Concat files into one with options.
fileconcat(src, dest, {
  unique: true,
  mkdirp: true,
  mode: '444',
  beforeEach (context) {
    return '\n//======= ' + context.src + ' ==========\n'
  }
}).then(() => {
  /* ... */
})
