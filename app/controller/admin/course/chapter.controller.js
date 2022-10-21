const createHttpError = require('http-errors')
const { StatusCodes: HttpStatus } = require('http-status-codes')
const { default: mongoose } = require('mongoose')

const Course = require('../../../models/course')
const { deleteInvalidFieldsInObject } = require('../../../utils/functions')
const Controller = require('../../controller')
const { CourseController } = require('./course.controller')

class ChapterController extends Controller {
  async addChapter (req, res, next) {
    try {
      const { id, title, text } = req.body
      await CourseController.findCourseById(id)
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
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: 'Chapter has been added successfully'
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async chaptersOfCOurse (req, res, next) {
    try {
      const { courseID } = req.params
      const course = await Course.findOne(
        { _id: courseID },
        { chapters: 1, title: 1 }
      )
      if (!course) throw createHttpError.NotFound('Chapter not found')

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
  async removeChapterById (req, res, next) {
    try {
      const { chapterID } = req.params
      await this.getOneChapter(chapterID)
      const deletedChapter = await Course.updateOne(
        { 'chapters._id': chapterID },
        {
          $pull: { chapters: { _id: chapterID } }
        }
      )
      if (deletedChapter.modifiedCount == 0)
        throw createHttpError.InternalServerError('Process Failed')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'Chapter has been deleted successfully'
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async updateChapterById (req, res, next) {
    try {
      const { chapterID } = req.params
      await this.getOneChapter(chapterID)
      const data = req.body
      deleteInvalidFieldsInObject(data, ['_id'])

      const updatedChapter = await Course.updateOne(
        {
          'chapters._id': chapterID
        },
        { $set: { 'chapters.$': data } }
      )
      if (updated.modifiedCount == 0)
        throw new createHttpError.InternalServerError('Internal Server Error')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'Chapter has been updated successfully'
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async getOneChapter (id) {
    const chapter = await Course.findOne(
      { 'chapters._id': id },
      { 'chapters.$': 1 }
    )
    if (!chapter)
      throw createHttpError.NotFound('NO chapter was found with this id')
    return chapter
  }
}

module.exports = {
  ChapterController: new ChapterController()
}
