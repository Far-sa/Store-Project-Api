const createError = require('http-errors')
const jwt = require('jsonwebtoken')

exports.randomNumberGenerator = () => {
  return Math.floor(Math.random() * 90000 + 10000)
}

exports.signAccessToken = payload => {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '24h'
  })
  return token
}

exports.verifyAccessToken = token => {
  const result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '24h'
  })
  if (!result.mobile)
    throw { status: 401, message: 'Please enter to your Account' }
  return result
}
