const router = require('express').Router()

const {
  EpisodeController
} = require('../../controller/admin/course/episode.controller')

router.post('/add', EpisodeController.addEpisode)

module.exports = router
