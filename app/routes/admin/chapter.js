const router = require('express').Router()

const {
  ChapterController
} = require('../../controller/admin/course/chapter.controller')

router.put('/add', ChapterController.addChapter)

module.exports = router
