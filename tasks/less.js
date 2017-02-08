'use strict'

/** @module less.js */

const fs = require('fs')
const path = require('path')
const ROOT = require('app-root-path').toString()
const less = require('less')

/**
 * Helper function to compile less files.
 *
 * @example
 *
 * // Basic Usage
 *
 * const less = require('./less.js')
 *
 * less('src/main.less', 'app/main.css')
 *
 * @name less
 * @param {string} src relative path to less file to be compiled.
 * @param {string} out relative path to output file.
 */
module.exports = function (src, out) {
  src = path.join(ROOT, src)
  out = path.join(ROOT, out)

  const file = fs.readFileSync(src, 'utf8')

  less.render(file)
  .then(function (output) {
    fs.writeFileSync(out, output.css)
  })
  .catch(function (error) {
    console.log('error occured compiling less', error)
    console.error(error)
  })
}
