const router = require('express').Router()

const { CourseController } = require('../../controller/admin/course.controller')
const { stringToArray } = require('../../middleware/stringToArray')
const { uploadFile } = require('../../utils/multer')

router.get('/list', CourseController.getCourses)
router.post(
  '/add',
  uploadFile.single('image'),
  stringToArray('tags'),
  CourseController.addCourse
)
router.get('/:id', CourseController.getCourseById)

router.put('/add-chapter', CourseController.addChapter)

module.exports = router
