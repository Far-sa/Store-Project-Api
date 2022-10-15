const router = require('express').Router()

const {
  ProductsController
} = require('../../controller/admin/product.controller')
const { stringToArray } = require('../../middleware/stringToArray')
const { uploadFile } = require('../../utils/multer')

/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items:
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *                type: object
 *                required:
 *                   -   title
 *                   -   short_text
 *                   -   text
 *                   -   category
 *                   -   price
 *                   -   discount
 *                   -   count
 *                   -   tags
 *                   -   images
 *                properties:
 *                   title:
 *                      type: string
 *                      description: the title of product
 *                   short_text:
 *                      type: string
 *                      description: the title of product
 *                   text:
 *                      type: string
 *                      description: the title of product
 *                   category:
 *                      type: string
 *                      description: the ID of product
 *                   tags:
 *                      type: array
 *                      description: the title of product
 *                   price:
 *                      type: number
 *                      description: the title of product
 *                   discount:
 *                      type: number
 *                      description: the title of product
 *                   count:
 *                      type: number
 *                      description: the title of product
 *                   height:
 *                      type: number
 *                      description: the height of product packet
 *                   weight:
 *                      type: number
 *                      description: the weight of product packet
 *                   width:
 *                      type: number
 *                      description: the with of product packet
 *                   length:
 *                      type: number
 *                      description: the length of product packet
 *                   images :
 *                      type: array
 *                      items :
 *                           type : string
 *                           format : binary
 *                   type:
 *                      type: string
 *                      description: the type of product
 *                   colors:
 *                      $ref: '#/components/schemas/Color'
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: Create New Product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: created new product
 */
router.post(
  '/add',
  uploadFile.array('images', 10),
  stringToArray('tags', 'colors'),
  ProductsController.addProduct
)

/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: Get all  Products
 *          responses:
 *              200:
 *                  description: success
 */
router.get('/list', ProductsController.getAllProduct)

/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: Get all  Products
 *          parameters :
 *              -    in: path
 *                   name : id
 *                   type : string
 *                   description : object id of product
 *          responses:
 *              200:
 *                  description: success
 */
router.get('/:id', ProductsController.getSingleProduct)

module.exports = router
