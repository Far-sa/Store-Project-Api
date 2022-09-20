const express = require('express')

const { BlogController } = require('../../controller/admin/blog.controller')

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

module.exports = router
