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
 *                   -   image
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
 *                   image :
 *                      type: file
 *
 *
 *
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
  uploadFile.single('image'),
  stringToArray('tags'),
  ProductsController.addProduct
)

module.exports = router
