'use strict'

const rollup = require('./rollup.js')
const appRootPath = require('app-root-path').toString()
const path = require('path')

// Rollup Javascript
rollup(path.join(appRootPath, 'src/background.js'), path.join(appRootPath, 'app/background.js'))
