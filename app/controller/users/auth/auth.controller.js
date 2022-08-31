const createHttpError = require('http-errors')

const authSchema = require('../../../validation/user/authValidation')

class UserAuthController {
  async login (req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body)
      result.status(200).send('Hey Puppet')
    } catch (err) {
      next(createHttpError.BadRequest(err.message))
    }
  }

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
