const { StatusCodes: HttpStatus } = require('http-status-codes')

const { CourseSchema } = require('../../../validation/admin/courseValidation')
const Controller = require('../../controller')

class EpisodeController extends Controller {
  async addEpisode (req, res, next) {
    try {
      await CourseSchema.validateAsync(req.body)
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: 'Episode has been added'
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async removeEpisodeById (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async updateEpisodeById (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  EpisodeController: new EpisodeController()
}
