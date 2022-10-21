const router = require('express').Router()

const {
  ChapterController
} = require('../../controller/admin/course/chapter.controller')

router.put('/add', ChapterController.addChapter)
router.get('/list/:courseID', ChapterController.chaptersOfCOurse)
router.patch('/remove/:chapterID', ChapterController.removeChapterById)
router.patch('/update/:chapterID', ChapterController.updateChapterById)

module.exports = router
