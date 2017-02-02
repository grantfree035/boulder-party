'use strict'

const roll = require('./rollup.js')
const Dir = require('./utils/dir.js')

const src = new Dir('src')
const dst = new Dir('app')

// Rollup Javascript
roll(src.path('background.js'), dst.path('background.js'))
