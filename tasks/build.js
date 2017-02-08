'use strict'

const rollup = require('./rollup.js')
const ROOT = require('app-root-path').toString()
const path = require('path')
const less = require('./less.js')

// Rollup Javascript
rollup(path.join(ROOT, 'src/background.js'), path.join(ROOT, 'app/background.js'))

// Render less css
less('src/stylesheets/main.less', 'app/app.css')
