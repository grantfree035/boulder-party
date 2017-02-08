'use strict'

const packager = require('electron-packager')
const ROOT = require('app-root-path').toString()

// Only building for Windows 32-bit during initial development.
// Will expand to other platforms upon first release.
const options = {
  dir: ROOT,
  arch: ['ia32'],
  asar: false,
  download: {
    strictSSL: false
  },
  icon: 'icon.ico',
  ignore: ['tasks/'],
  name: 'Boulder Party',
  out: ROOT,
  overwrite: true,
  platform: ['win32'],
  prune: true,
  quiet: false
}

function done (err, appPaths) {
  if (err) console.log(err)
  console.log(appPaths)
}

packager(options, done)
