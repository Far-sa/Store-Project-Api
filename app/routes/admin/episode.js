const router = require('express').Router()

const { uploadVideo } = require('../../utils/multer')

const {
  EpisodeController
} = require('../../controller/admin/course/episode.controller')

router.post('/add', uploadVideo.single('video'), EpisodeController.addEpisode)
router.delete('/remove/:episodeID', EpisodeController.removeEpisodeById)

module.exports = router
