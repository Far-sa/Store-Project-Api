const express = require('express')

const { BlogController } = require('../../controller/admin/blog.controller')
const { stringToArray } = require('../../middleware/stringToArray')
const { verifyAccessToken } = require('../../utils/functions')
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
 *              -   in : header
 *                  name : access-token
 *                  value : Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM2MjQ4OTAzMCIsImlhdCI6MTY2NTMyMzcxOSwiZXhwIjoxNjY1NDEwMTE5fQ.-9mgoKYP-a_UopsnJlDeq16W7YtIH3IDKcVOrFUaIAk
 *                  sample : Bearer <Token>
 *                  required : true
 *                  type : string
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
  verifyAccessToken,
  uploadFile.single('image'),
  stringToArray('tags'),
  BlogController.createBlog
)

module.exports = router
