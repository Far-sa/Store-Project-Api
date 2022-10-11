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
/**
 * @swagger
 *   /admin/blogs/{id}:
 *      get :
 *          summary : Get A single Blog by  its ID
 *          tags: [Blogs(AdminPanel)]
 *          parameters :
 *              -     in : path
 *                    name : id
 *                    type : string
 *                    required : true
 *          responses :
 *              200:
 *                    description : success
 *
 */
router.get('/:id', BlogController.getBlogById)

/**
 * @swagger
 *   /admin/blogs/{id}:
 *      delete :
 *          summary : Delete A single Blog by  its ID
 *          tags: [Blogs(AdminPanel)]
 *          parameters :
 *              -     in : path
 *                    name : id
 *                    type : string
 *                    required : true
 *          responses :
 *              200:
 *                    description : success
 *
 */
router.delete('/:id', BlogController.getBlogById)

/**
 * @swagger
 *   /admin/blogs/update/{id}:
 *       patch :
 *          tags: [Blogs(AdminPanel)]
 *          summary : Update a blog document By ID
 *          consumer :
 *              - multipart/form-data
 *          parameters :
 *              -   in : header
 *                  name : access-token
 *                  sample : Bearer <Token>
 *                  type : string
 *                  required : true
 *              -   in : formData
 *                  name : title
 *                  type : string
 *              -   in : path
 *                  name : id
 *                  required : true
 *                  type : string
 *              -   in : formData
 *                  name : text
 *                  type : string
 *              -   in : formData
 *                  name : short_text
 *                  type : string
 *              -   in : formData
 *                  name : image
 *                  type : file
 *              -   in : formData
 *                  name : tags
 *                  example : tag1#tag2#tag3_foo# || undefined
 *                  type : string
 *              -   in : formData
 *                  name : category
 *                  type : string
 *          responses :
 *                 201:
 *                   description : Created
 */
router.patch(
  '/update/:id',
  verifyAccessToken,
  uploadFile.single('image'),
  stringToArray('tags'),
  BlogController.updateBlogById
)

module.exports = router
