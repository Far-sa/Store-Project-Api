const { StatusCodes: HttpStatus } = require('http-status-codes')

const Controller = require('../controller')
const Course = require('../../models/course')

class CourseController extends Controller {
  async getCourses (req, res, next) {
    try {
      const courses = await Course.find({}).sort({ _id: -1 })
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        courses
      })
    } catch (err) {
      next(err)
    }
  }
  async getCourseById (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async UpdateCourseById (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async deleteCourseById (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  CourseController: new CourseController()
}
