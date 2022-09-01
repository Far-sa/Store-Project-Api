const createHttpError = require('http-errors')

const authSchema = require('../../../validation/user/authValidation')
const User = require('../../../models/users')
const { randomNumberGenerator } = require('../../../utils/functions')
const { EXPIRES_IN } = require('../../../utils/constants')
const Controller = require('../../controller')

class UserAuthController extends Controller {
  async login (req, res, next) {
    try {
      await authSchema.validateAsync(req.body)
      const { mobile } = req.body
      const code = randomNumberGenerator()
      const result = this.saveUser(mobile, code)
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
  async checkUserExist (mobile) {
    const user = await User.findOne({ mobile })
    return !!user
  }
  async saveUser (mobile, code) {
    let otp = {
      code,
      expiresIn: EXPIRES_IN
    }
    const result = await this.checkUserExist(mobile)
    if (result) {
      return await this.updateUser(mobile, { otp })
    }
    return !!(await User.create({
      mobile,
      otp,
      roles: ['USER_ROLE']
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
