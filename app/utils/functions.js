const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')

const User = require('../models/users')
const redisClient = require('./redis')

exports.randomNumberGenerator = () => {
  return Math.floor(Math.random() * 90000 + 10000)
}

exports.signAccessToken = async userId => {
  const user = await User.findById(userId)
  const payload = {
    mobile: user.mobile
  }
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '24h'
  })
  return token
}

exports.signRefreshToken = userId => {
  return new Promise(async (resolve, reject) => {
    const user = await User.findById(userId)

    const payload = { mobile: user.mobile }

    jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: '1y' },
      async (err, token) => {
        if (err) reject(createHttpError.InternalServerError('Server Error'))

        await redisClient.SETEX('userId', 31536000, token)
        resolve(token)
      }
    )
  })
}

exports.verifyAccessToken = token => {
  const result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '24h'
  })
  if (!result.mobile)
    throw createHttpError.Unauthorized('Please enter to your Account')
  return result
}
exports.verifyRefreshToken = async token => {
  try {
    const result = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY)
    if (!result) throw createHttpError.Unauthorized('Please Login ')
    const { mobile } = result || {}
    //console.log('result:', mobile)
    const user = await User.findOne({ mobile }, { password: 0, otp: 0 })
    if (!user) throw createHttpError.NotFound('User not found')

    const userID = user._id
    console.log(userID)

    const refreshToken = await redisClient.get('userId')
    if (token === refreshToken) return mobile
    throw createHttpError.Unauthorized(
      'Your entrance was not successfully approved'
    )

    return user.mobile
  } catch (err) {
    console.log(err.message)
  }
}
