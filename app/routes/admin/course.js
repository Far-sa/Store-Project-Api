const router = require('express').Router()

const { CourseController } = require('../../controller/admin/course.controller')

/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get all of courses
 *          responses :
 *              200:
 *                  description: success
 */
router.get('/list', CourseController.getCourses)
// router.post()
// router.delete()
// router.put()
// router.patch()
// router.get()

module.exports = router
