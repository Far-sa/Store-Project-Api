const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

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

function getToken (headers) {
  const [bearer, token] = headers?.authorization?.split(' ') || []
  if (token && ['Bearer', 'bearer'].includes(bearer)) return token
  throw createHttpError.Unauthorized('Please Login to Your Account!')
}

exports.verifyAccessToken = async (req, res, next) => {
  try {
    const token = getToken(req.headers)
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      async (err, payload) => {
        //? check if decodedToken is Ok!
        if (err) throw createHttpError.BadRequest('Authorization failed')
        const { mobile } = payload || {}
        const user = await User.findOne(
          { mobile },
          { password: 0, otp: 0, bills: 0, discount: 0 }
        )
        if (!user) throw createHttpError.Unauthorized('Account was not found')
        req.user = user
        return next()
      }
    )
  } catch (err) {
    next(err)
  }
}

exports.checkRole = role => {
  return (req, res, next) => {
    try {
      const user = req.user
      if (user.Roles.includes(role)) return next()
      throw createHttpError.Forbidden('You do not have access to this section')
    } catch (err) {
      next(err)
    }
  }
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

exports.deleteFileInAddress = fileAddress => {
  if (fileAddress) {
    const pathFile = path.join(__dirname, '..', '..', 'public', fileAddress)
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
  }
}

// ust + to make str to number
exports.setFeatures = body => {
  const { colors, width, weight, height, length } = body
  let features = {}
  features.colors = colors
  if (!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)) {
    if (!width) features.width = 0
    else features.width = +width
    if (!height) features.height = 0
    else features.height = +height
    if (!weight) features.weight = 0
    else features.weight = +weight
    if (!length) features.length = 0
    else features.length = +length
  }
  return features
}

//* req.body.image.replace(/\\/g,"/")
exports.imagesListFromRQ = (files, fileUploadPath) => {
  if (files?.length > 0) {
    return files.map(file => path.join(fileUploadPath, file.filename))
  } else {
    return []
  }
}
