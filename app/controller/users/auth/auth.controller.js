const createHttpError = require('http-errors')

const User = require('../../../models/users')
const {
  getOtpSchema,
  checkOtpSchema
} = require('../../../validation/user/authValidation')
const {
  randomNumberGenerator,
  signAccessToken,
  verifyRefreshToken,
  signRefreshToken
} = require('../../../utils/functions')
const { EXPIRES_IN, USER_ROLE } = require('../../../utils/constants')
const Controller = require('../../controller')

class UserAuthController extends Controller {
  async getOTP (req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body)
      const { mobile } = req.body
      const code = randomNumberGenerator()
      const result = await this.saveUser(mobile, code)
      if (!result) throw createHttpError.Unauthorized('Login failed')
      res.status(200).json({
        data: {
          statusCode: 200,
          message: 'Evaluation Code was sent successfully.',
          code,
          mobile
        }
      })
    } catch (err) {
      next(createHttpError.BadRequest(err.message))
    }
  }

  async checkOtp (req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body)
      const { mobile, code } = req.body
      const user = await User.findOne({ mobile })

      if (!user) throw createHttpError.NotFound('User not found')
      if (user.otp.code != code)
        throw createHttpError.Unauthorized('you sent a wrong code')

      const now = Date.now()
      if (+user.otp.expiresIn < now)
        throw createHttpError.Unauthorized('You code has been expired')

      const accessToken = await signAccessToken(user._id)
      const refreshToken = await signRefreshToken(user._id)
      return res.json({
        data: {
          accessToken,
          refreshToken,
          user
        }
      })
    } catch (err) {
      next(err)
    }
  }

  async refreshToken (req, res, next) {
    try {
      const { refreshToken } = req.body
      const mobile = await verifyRefreshToken(refreshToken)
      const user = User.findOne({ mobile })
      const accessToken = await signAccessToken(user._id)
      const newRefreshToken = await signRefreshToken(user._id)
      return res.json({
        data: {
          accessToken,
          refreshToken: newRefreshToken
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async checkUserExist (mobile) {
    const user = await User.findOne({ mobile })
    return !!user
  }
  async saveUser (mobile, code) {
    let otp = {
      code,
      expiresIn: new Date().getTime() + 120000
    }
    const result = await this.checkUserExist(mobile)
    if (result) {
      return await this.updateUser(mobile, { otp })
    }
    return !!(await User.create({
      mobile,
      otp,
      roles: [USER_ROLE]
    }))
  }

  async updateUser (mobile, objectData) {
    Object.keys(objectData).forEach(key => {
      if (['', ' ', '0', 0, null, undefined, NaN].includes(objectData[key]))
        delete objectData[key]
    })

    const updateResult = await User.updateOne({ mobile }, { $set: objectData })
    return !!updateResult.modifiedCount
  }

  //* Register Controller
  async register (req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body)
      result.status(200).send('Hey Puppet')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = { UserAuthController: new UserAuthController() }
