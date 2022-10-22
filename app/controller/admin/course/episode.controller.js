const path = require('path')
const { StatusCodes: HttpStatus } = require('http-status-codes')
const { default: getVideoDurationInSeconds } = require('get-video-duration')

const { EpisodeSchema } = require('../../../validation/admin/courseValidation')
const Controller = require('../../controller')
const { getTime } = require('../../../utils/functions')
const Course = require('../../../models/course')
const createHttpError = require('http-errors')
const objectIdValidator = require('../../../validation/publicValidator')

class EpisodeController extends Controller {
  async addEpisode (req, res, next) {
    try {
      const {
        title,
        text,
        type,
        chapterID,
        courseID,
        filename,
        fileUploadPath
      } = await EpisodeSchema.validateAsync(req.body)

      const videoAddress = path.join(fileUploadPath, filename)
      const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`
      const seconds = await getVideoDurationInSeconds(videoURL)
      const time = getTime(seconds)
      const episode = { title, text, type, time, videoAddress }

      const createdEpisode = await Course.updateOne(
        {
          _id: courseID,
          'chapters._id': chapterID
        },
        { $push: { 'chapters.$.episodes': episode } }
      )
      if (createdEpisode.modifiedCount == 0)
        throw new createHttpError.InternalServerError(
          'adding process was failed'
        )
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: 'Episode has been added'
        }
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  async removeEpisodeById (req, res, next) {
    try {
      const { id: episodeID } = await objectIdValidator.validateAsync({
        id: req.params.episodeID
      })
      const removedResult = await Course.updateOne(
        {
          'chapters.episodes_id': episodeID
        },
        { $pull: { 'chapters.$.episodes': { _id: episodeID } } }
      )
      if (removedResult.modifiedCount == 0)
        throw new createHttpError.InternalServerError(
          'deleting episodes failed'
        )
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'Episode has been deleted successfully'
        }
      })
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
