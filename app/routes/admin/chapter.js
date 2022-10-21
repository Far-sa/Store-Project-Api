const router = require('express').Router()

const {
  ChapterController
} = require('../../controller/admin/course/chapter.controller')

router.put('/add', ChapterController.addChapter)
router.get('/list/:courseID', ChapterController.chaptersOfCOurse)

module.exports = router
