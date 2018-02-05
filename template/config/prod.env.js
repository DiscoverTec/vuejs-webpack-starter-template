const version = require('../package.json').version

'use strict'
module.exports = {
  version: `"${version}"`,
  NODE_ENV: '"production"'
}
