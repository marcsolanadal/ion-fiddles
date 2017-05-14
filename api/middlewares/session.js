const { db } = require('../db')

// Extracting the session from headers and checking if the token for a given
// user matches the one stored in the database. In case it does, a session
// object is created and attached to the request.
module.exports = function(req, res, next) {
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
}
