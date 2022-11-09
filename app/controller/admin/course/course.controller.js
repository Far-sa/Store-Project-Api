const { StatusCodes: HttpStatus } = require('http-status-codes')
const path = require('path')

const Controller = require('../../controller')
const Course = require('../../../models/course')
const { CourseSchema } = require('../../../validation/admin/courseValidation')
const createHttpError = require('http-errors')
const { default: mongoose } = require('mongoose')
const {
  deleteInvalidFieldsInObject,
  deleteFileInAddress
} = require('../../../utils/functions')

class CourseController extends Controller {
  async getCourses (req, res, next) {
    try {
      const search = req.query.search
      let courses
      if (search) {
        courses = await Course.find({ $text: { $search: search } })
          .populate([
            { path: 'category', select: { title: 1 } },
            { path: 'teacher', select: { mobile: 1, email: 1, last_name: 1 } }
          ])
          .sort({
            _id: -1
          })
      } else {
        courses = await Course.find({})
          .populate([
            { path: 'category', select: { title: 1 } },
            { path: 'teacher', select: { mobile: 1, email: 1, last_name: 1 } }
          ])
          .sort({ _id: -1 })
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          courses
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async addCourse (req, res, next) {
    try {
      await CourseSchema.validateAsync(req.body)
      const { fileUploadPath, filename } = req.body
      const image = path.join(fileUploadPath, filename)
      const teacher = req.user._id
      const {
        title,
        text,
        short_text,
        tags,
        type,
        category,
        price,
        discount
      } = req.body

      const course = await Course.create({
        title,
        text,
        short_text,
        tags,
        type,
        category,
        price,
        discount,
        image,
        time: '00.00.00',
        status: 'notStarted',
        teacher
      })
      if (!course?._id)
        throw createHttpError.InternalServerError('Adding Process failed')
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'Course has been added successfully'
        }
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  async getCourseById (req, res, next) {
    try {
      const { id } = req.params
      const course = await Course.findById(id)
      if (!course) throw createHttpError.NotFound('Course not found')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          course
        }
      })
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
  async updateCOurseById (req, res, next) {
    try {
      const { id } = req.params
      const course = await this.findCourseById(id)
      const data = copyObject(req.body)
      const { filename, fileUploadPath } = req.body
      let blackListFields = [
        'time',
        'chapters',
        'episodes',
        'students',
        'likes',
        'bookmarks',
        'dislikes',
        'comments',
        'filename',
        'fileUploadPath'
      ]
      deleteInvalidFieldsInObject(data, blackListFields)
      if (req.file) {
        data.image = path.join(fileUploadPath, filename)
        deleteFileInAddress(course.image)
      }
      const updatedResult = await Course.updateOne(
        { _id: id },
        {
          $set: data
        }
      )
      if (!updatedResult.modifiedCount)
        throw createHttpError.InternalServerError('updating process was failed')

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'Course has been updated'
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
  CourseController: new CourseController()
}
