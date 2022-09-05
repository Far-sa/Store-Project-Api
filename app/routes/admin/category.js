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
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get All children of Parents Category
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get('/children/:parent', CategoryController.getParentsChild)

/**
 * @swagger
 *  /admin/category/list:
 *     get:
 *        tags : [Admin-Panel]
 *        summary : Get All Categories
 *        responses :
 *                 200:
 *                   description : success
 */
router.get('/list', CategoryController.getAllCategory)

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Panel]
 *          summary: remove category with object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          responses:
 *              200:
 *                  description: success
 */
router.delete('/remove/:id', CategoryController.removeCategory)

module.exports = router
