const router = require('express').Router()

const {
  CategoryController
} = require('../../controller/admin/category.controller')



/**
 * @swagger
 *   /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
 *          summary : Create a new category
 *          parameters:
 *            -    name : title
 *                 in : formData
 *                 type : string
 *                 required : true
 *            -    name : parent
 *                 in : formData
 *                 type : string
 *                 required : false
 *          responses:
 *                200:
 *                 description: success
 *
 */
router.post('/add', CategoryController.addCategory)

module.exports = router
