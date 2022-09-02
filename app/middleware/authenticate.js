const jwt = require('jsonwebtoken')

const User = require('../models/users')
const { verifyAccessToken } = require('../utils/functions')

exports.authenticated = async (req, res, next) => {
  try {
    const authHeader = req?.headers?.['access-token']
    if (!authHeader)
      throw {
        status: 401,
        message: 'You are not allowed to access this endpoint'
      }
    const token = authHeader.split(' ')[1]
    if (!token)
      throw {
        status: 401,
        message: 'You are not allowed to access this endpoint'
      }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)

    const user = await User.findOne(payload, { _id: 0, otp: 0, bills: 0 })
    //console.log(user)
    if (!user)
      throw {
        status: 404,
        message: 'user NotFound'
      }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}
