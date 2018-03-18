const appName = require('../package.json').name
const version = require('../package.json').version

'use strict'
module.exports = {
  version: `"${version}"`,
  appName: `"${appName}"`,
  NODE_ENV: '"production"'
}
