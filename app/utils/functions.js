const jwt = require('jsonwebtoken')

exports.randomNumberGenerator = () => {
  return Math.floor(Math.random() * 90000 + 10000)
}

exports.signAccessToken = userId => {
  
  return jwt.sign(userId, process.env.SECRET_KEY, { expiresIn: '1h' })
}
