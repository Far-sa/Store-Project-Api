const { StatusCodes: HttpStatus } = require('http-status-codes')

const Controller = require('../../controller')
const User = require('../../../models/users')

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
}

module.exports = {
  UserController: new UserController()
}
