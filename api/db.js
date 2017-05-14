const fs = require('fs')
const path = require('path')
const redis = require('redis')
const {
  config: {
    fiddle,
    database: {
      hostname,
      port
    }
  }
} = require('../package.json');

const connection = redis.createClient(6379, '192.168.2.59')
const projectFolder = path.dirname(require.main.filename)
const dataPath = path.join(projectFolder, 'fiddles', fiddle, 'api/data.js');

let data = {}
try {
  data = require(dataPath)
  console.log(`Mocking data found...`)
} catch(err) {
  console.error('No mocking data specified...')
  process.exit(1)
}

exports.db = connection
exports.data = data
