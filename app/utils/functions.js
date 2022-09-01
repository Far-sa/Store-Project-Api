const jwt = require('jsonwebtoken')

exports.randomNumberGenerator = () => {
  return Math.floor(Math.random() * 90000 + 10000)
}

exports.signAccessToken = payload => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
  return token
}
