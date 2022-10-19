const express = require('express')

const { BlogController } = require('../../controller/admin/blog.controller')
const { stringToArray } = require('../../middleware/stringToArray')
const { uploadFile } = require('../../utils/multer')

const router = express.Router()

router.get('/', BlogController.getBlogs)
router.post(
  '/add',
  uploadFile.single('image'),
  stringToArray('tags'),
  BlogController.createBlog
)
router.get('/:id', BlogController.getBlogById)
router.delete('/:id', BlogController.getBlogById)
router.patch(
  '/update/:id',
  uploadFile.single('image'),
  stringToArray('tags'),
  BlogController.updateBlogById
)

module.exports = router
