const router = require('express').Router()

const { CourseController } = require('../../controller/admin/course.controller')
const { stringToArray } = require('../../middleware/stringToArray')
const { uploadFile } = require('../../utils/multer')

/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *               type: string
 *               enum:
 *                   -   free
 *                   -   cash
 *                   -   special
 *          Status:
 *               type: boolean
 *               enum:
 *                   -   true
 *                   -   false
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Insert-Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example:  Course's title
 *                  short_text:
 *                      type: string
 *                      description: the title of course
 *                      example: Some info ...
 *                  text:
 *                      type: string
 *                      description: the title of course
 *                      example: Write your body ..
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the category of course
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of course
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of course
 *                      example: 0
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/schemas/Types'
 *
 */

//? Get List
/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get all of courses
 *          parameters :
 *               -   in : query
 *                   name : search
 *                   type : text
 *                   description : Search in Course base on title,text and body
 *          responses :
 *              200:
 *                  description: success
 */
router.get('/list', CourseController.getCourses)

//? Create Course
/**
 * @swagger
 *  /admin/courses/add:
 *     post:
 *          tags: [Course(AdminPanel)]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Insert-Course'
 *          responses :
 *              201:
 *                  description: success
 */
router.post(
  '/add',
  uploadFile.single('image'),
  stringToArray('tags'),
  CourseController.addCourse
)

module.exports = router
