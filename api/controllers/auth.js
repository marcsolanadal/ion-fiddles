const express = require('express')
const crypto = require('crypto')
const redis = require('redis')

const { db, data } = require('../db')

const router = express.Router()

router.post('/', (req, res) => {
  const { user, password } = req.body
  if (password === data.users[user].password) {
    const token = crypto.randomBytes(64).toString('hex')
    db.set(user, token)
    res.send(token)
  } else {
    res.status(500).send('invalid login')
  }
})

router.get('/', (req, res) => {
  db.get(req.session.user, (err, reply) => {
    res.send(reply)
  })
})

module.exports = router
