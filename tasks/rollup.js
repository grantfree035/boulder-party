const fs = require('fs')
const path = require('path')
const rollup = require('rollup').rollup
const appRootPath = require('app-root-path').toString()
const relAppRootPath = path.relative(__dirname, appRootPath)

const nodeBuiltInModules = ['assert', 'buffer', 'child_process', 'cluster',
  'console', 'constants', 'crypto', 'dgram', 'dns', 'domain', 'events',
  'fs', 'http', 'https', 'module', 'net', 'os', 'path', 'process', 'punycode',
  'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'timers',
  'tls', 'tty', 'url', 'util', 'v8', 'vm', 'zlib']

const devDependencyModules = ['electron']

const dependencyModules = require(path.join(relAppRootPath, 'package.json'))['dependencies']

function externalModules () {
  return [].concat(nodeBuiltInModules, devDependencyModules, dependencyModules)
}

module.exports = function (src, dst) {
  rollup({

    entry: src,
    external: externalModules()

  }).then(function (bundle) {
    const result = bundle.generate({
      format: 'cjs',
      sourceMap: true,
      sourceMapFile: path.basename(dst)
    })

    fs.writeFileSync(dst, result.code)
    fs.writeFileSync(`${dst}.map`, result.map.toString())
  })
}
