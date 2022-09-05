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
clear
 *          responses:
 *                    200:
 *                    description: success
 *
 */
router.post('/add', CategoryController.addCategory)
/**
 * @swagger
 *   /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary : Get Parents List
 *          responses :
 *                  200:
 *                    description: success
 */
router.get('/parents', CategoryController.getAllParents)

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *     get:
 *        tags : [Admin-Panel]
 *        summary : Get Parents's Child
 *        parameters :
 *            -      in : path
 *                   name : Child of parent
 *                   type : string
 *                   required : true
 *        responses :
 *                   200:
 *                   description : success
 */
router.get('/children/:parent', CategoryController.getParentsChild)

/**
 * @swagger
 *  /admin/category/list:
 *     get:
 *        tags : [Admin-Panel]
 *        summary : Get All Categories
 *        responses :
 *                   200:
 *                   description : success
 */
router.get('/list', CategoryController.getAllCategory)

module.exports = router
