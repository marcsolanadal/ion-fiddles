const express = require('express')
const { db, data } = require('../../../../api/db')

const router = express.Router()

router.get('/', (req, res) => {
  res.json(data.users[req.session.user])
})

module.exports = router
