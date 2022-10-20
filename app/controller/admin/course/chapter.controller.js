const createHttpError = require('http-errors')
const { StatusCodes: HttpStatus } = require('http-status-codes')
const { default: mongoose } = require('mongoose')

const Course = require('../../../models/course')

const Controller = require('../../controller')

class ChapterController extends Controller {
  async addChapter (req, res, next) {
    try {
      const { id, title, text } = req.body
      await this.findCourseById(id)
      const savedChapter = await Course.updateOne(
        { _id: id },
        {
          $push: {
            chapters: { text, title, episodes: [] }
          }
        }
      )
      if (savedChapter.modifiedCount == 0)
        throw createHttpError.InternalServerError('process failed')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'Chapter has been added successfully'
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async findCourseById (id) {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError.BadRequest('Please insert a valid ID')
    const course = await Course.findById(id)
    if (!course) throw createHttpError.NotFound('Course not found')
    return course
  }
}

module.exports = {
  ChapterController: new ChapterController()
}
