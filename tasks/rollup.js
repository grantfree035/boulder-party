'use strict'

/** @module rollup.js */

const fs = require('fs')
const path = require('path')
const rollup = require('rollup').rollup
const appRootPath = require('app-root-path').toString()
const relAppRootPath = path.relative(__dirname, appRootPath)

/**
 * Helper function to rollup singe JS file during build process.
 *
 * @example
 *
 * // Basic usage
 *
 * const rollup = require('./rollup.js')
 *
 * rollup('src/background.js', 'app/background.js')
 *
 * @name rollup
 * @param {string} src absolute path to js file being rolled.
 * @param {string} dst absolute output path for js file.
 */
module.exports = function (src, dst) {
  // Make sure paths are absolute
  src = path.resolve(src)
  dst = path.resolve(dst)

  // Bulk define Node's built in modules.
  // Only the ones that are used will be added during rollup.
  const nodeBuiltInModules = ['assert', 'buffer', 'child_process', 'cluster',
    'console', 'constants', 'crypto', 'dgram', 'dns', 'domain', 'events',
    'fs', 'http', 'https', 'module', 'net', 'os', 'path', 'process', 'punycode',
    'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'timers',
    'tls', 'tty', 'url', 'util', 'v8', 'vm', 'zlib']

  // List all dev dependency modules used in the app.
  // This should be a very small list (special cases).
  const devDependencyModules = ['electron']

  // All dependency modules will obviously be external.
  // A relative file path is needed for the require.
  // use array method [] instead of property (.) to avoid Exception Handling.
  const dependencyModules = require(path.join(relAppRootPath, 'package.json'))['dependencies']

  rollup({

    // JS file path.
    entry: src,

    // Exteranl should be all of the external modules in one array.
    external: [].concat(nodeBuiltInModules, devDependencyModules, dependencyModules)

  }).then(function (bundle) {
    // generate resulting rollup
    const result = bundle.generate({

      // CommonJS - default
      format: 'cjs',

      // Promotes readability when doing live debugging
      sourceMap: true,

      // Map files should match output filename
      sourceMapFile: path.basename(dst)
    })

    // Output to files
    fs.writeFileSync(dst, result.code)
    fs.writeFileSync(`${dst}.map`, result.map.toString())
  })
}
