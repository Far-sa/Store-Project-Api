const express = require('express')

const { BlogController } = require('../../controller/admin/blog.controller')
const { stringToArray } = require('../../middleware/stringToArray')
const { uploadFile } = require('../../utils/multer')

const router = express.Router()

/**
 * @swagger
 *   /admin/blogs:
 *       get :
 *          tags: [Blogs(AdminPanel)]
 *          summary : Get list of blogs
 *          responses :
 *                 200:
 *                   description : success
 */
router.get('/', BlogController.getBlogs)

/**
 * @swagger
 *   /admin/blogs/add:
 *       post :
 *          tags: [Blogs(AdminPanel)]
 *          summary : Create blog document
 *          consumer :
 *              - multipart/form-data
 *          parameters :
 *              -   in : formData
 *                  name : title
 *                  required : true
 *                  type : string
 *              -   in : formData
 *                  name : text
 *                  required : true
 *                  type : string
 *              -   in : formData
 *                  name : short_text
 *                  required : true
 *                  type : string
 *              -   in : formData
 *                  name : image
 *                  required : true
 *                  type : file
 *              -   in : formData
 *                  name : tags
 *                  example : tag1#tag2#tag3_foo# || undefined
 *                  type : string
 *              -   in : formData
 *                  name : category
 *                  type : string
 *                  required : true
 *          responses :
 *                 201:
 *                   description : Created
 */
router.post(
  '/add',
  uploadFile.single('image'),
  stringToArray('tags'),
  BlogController.createBlog
)

module.exports = router
