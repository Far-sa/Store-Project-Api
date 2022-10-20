//? Color's Schema
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

//? Main Schema
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

//? Main Schema/ Edit-Product
/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Product:
 *                type: object
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

//? Post/Create product
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
 *                  content :
 *                       application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
 */

//? Get List Products
/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: Get all  Products
 *          parameters :
 *               -   in : query
 *                   name: search
 *                   type: string
 *                   description: search by query(text,title)
 *          responses:
 *              200:
 *                  description: success
 */

//? Get Single Product
/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: Get a Product
 *          parameters :
 *              -    in: path
 *                   name : id
 *                   type : string
 *                   description : object id of product
 *          responses:
 *              200:
 *                  description: success
 */

//? Delete Single Product
/**
 * @swagger
 *  /admin/products/remove/{id}:
 *      delete:
 *          tags: [Product(AdminPanel)]
 *          summary: Delete a Product
 *          parameters :
 *              -    in: path
 *                   name : id
 *                   type : string
 *                   description : object id of product
 *          responses:
 *              200:
 *                  description: success
 *                  content :
 *                       application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
 */

//? Update/Edit product
/**
 * @swagger
 *  /admin/products/edit/{id}:
 *      patch:
 *          tags: [Product(AdminPanel)]
 *          summary: Update Product info
 *          parameters:
 *               -    in : path
 *                    name : id
 *                    required : true
 *                    type : string
 *                    description : ObjectId of product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Product'
 *          responses:
 *              200:
 *                  description: product Updated- Success
 *                  content :
 *                       application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
 */
