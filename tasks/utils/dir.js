'use strict'

const path = require('path')

class Dir {
  constructor (base) {
    this.root = path.join(process.cwd(), base)
  }

  path (end) {
    return path.join(this.root, end)
  }
}

module.exports = Dir
