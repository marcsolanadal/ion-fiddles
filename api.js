const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

const { db } = require('./api/db')
const session = require('./api/middlewares/session')
const auth = require('./api/controllers/auth')
const {
  config: {
    fiddle,
    back: {
      hostname,
      port
    }
  }
} = require('./package.json');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => setTimeout(next, 300));
app.use(morgan('dev'))
app.use(session)

// Shared routes between fiddles
app.use('/token', auth)

// Loading all the controlers inside the fiddle controller folder
const fiddleControllers = path.join(__dirname, 'fiddles', fiddle, 'controllers');
fs.readdir(fiddleControllers, (err, files) => {
  if (files === undefined) {
    console.error('No controllers found...')
    process.exit(1)
  } else {
    files.forEach(file => {
      const name = file.split('.')[0]
      const controllerPath = path.join(fiddleControllers, file)
      app.use(`/${name}`, require(controllerPath))
    })
  }
})

app.listen(port, hostname, function() {
  console.log(`API for fiddle ${fiddle} running on ${hostname}:${port}...`);
});
