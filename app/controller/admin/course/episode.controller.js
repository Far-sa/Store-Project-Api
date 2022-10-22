const path = require('path')
const { StatusCodes: HttpStatus } = require('http-status-codes')
const { default: getVideoDurationInSeconds } = require('get-video-duration')

const { EpisodeSchema } = require('../../../validation/admin/courseValidation')
const Controller = require('../../controller')
const { getTime } = require('../../../utils/functions')

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
      console.log('VideoURL', videoURL)
      const seconds = await getVideoDurationInSeconds(videoURL)
      const time = getTime(seconds)
      const episode = { title, text, type, time, videoAddress }

      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          episode
          //message: 'Episode has been added'
        }
      })
    } catch (err) {
      console.log(err)
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
