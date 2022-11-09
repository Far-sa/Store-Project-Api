const { StatusCodes: HttpStatus } = require('http-status-codes')

const Controller = require('../../controller')
const User = require('../../../models/users')
const createHttpError = require('http-errors')

class UserController extends Controller {
  async getUsers (req, res, next) {
    try {
      // search base on Query
      const { search } = req.query
      const dataBseQuery = {}
      if (search) dataBseQuery['$text'] = { $search: search }
      //
      const users = await User.find({})
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          users
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async updateUserProfile (req, res, next) {
    try {
      const userId = req.user._id
      const data = req.body
      const blackListFields = [
        'mobile',
        'otp',
        'bills',
        'discount',
        'courses',
        'Roles'
      ]
      deleteInvalidFieldsInObject(data, blackListFields)
      const updatedProfile = await User.updateOne(
        { _id: userId },
        { $set: data }
      )
      if (!updatedProfile.modifiedCount)
        throw new createHttpError.InternalServerError('update failed')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'Update process has been done'
        }
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  UserController: new UserController()
}
