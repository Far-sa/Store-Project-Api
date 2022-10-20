const router = require('express').Router()

const {
  ChapterController
} = require('../../controller/admin/course/chapter.controller')

router.put('/add-chapter', ChapterController.addChapter)

module.exports = router
