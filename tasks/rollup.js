const fs = require('fs')
const path = require('path')
const rollup = require('rollup').rollup

const builtInModules = ['path', 'url']
const dependencyModules = ['electron']

function externalModules () {
  return [].concat(builtInModules, dependencyModules)
}

module.exports = function (src, dst) {

  rollup({

    entry: src,
    external: externalModules()

  }).then(function (bundle) {

    const result = bundle.generate({
      format: 'cjs',
      sourceMap: true,
      sourceMapFile: path.basename(dst),
    })

    fs.writeFileSync(dst, result.code)
    fs.writeFileSync(`${dst}.map`, result.map.toString())
  })

}
