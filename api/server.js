const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const morgan = require('morgan')
const redis = require('redis')

const data = require('./data')
const { config } = require('../package.json');

// Getting the config variables
const { fiddle, hostname, apiPort } = config;

const app = express()
const db = redis.createClient(6379, '192.168.2.59')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => setTimeout(next, 300));
app.use(morgan('dev'))

// Extracting the session from headers and checking if the token for a given
// user matches the one stored in the database. In case it does, a session
// object is created and attached to the request.
app.use((req, res, next) => {
  if (req.originalUrl === '/token' && req.method === 'POST') {
    next()
  } else {
    const { user, token } = JSON.parse(req.headers.session)
    db.get(user, (err, result) => {
      if (result === token) {
        req.session = { user, token }
        next()
      } else {
        res.status(500).send('invalid token')
      }
    })
  }
})

app.post('/token', (req, res) => {
  const { user, password } = req.body
  if (password === data.users[user].password) {
    const token = crypto.randomBytes(64).toString('hex')
    db.set(user, token)
    res.send(token)
  } else {
    res.status(500).send('invalid login')
  }
})

app.get('/token', (req, res) => {
  db.get(req.session.user, (err, reply) => {
    res.send(reply)
  })
})

app.get('/overview', (req, res) => {
  res.json(data.users[req.session.user])
})

app.get('/powers/:id', (req, res) => {
  res.send(`${uuid.v4()}: Hello ${req.params.id}`)
})

app.listen(config.apiPort, config.server, function() {
  console.log(`API for fiddle ${fiddle} running on ${hostname}:${apiPort}...`);
});
