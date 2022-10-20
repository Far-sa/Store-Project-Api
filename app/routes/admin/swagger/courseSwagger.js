/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *               type: string
 *               enum:
 *                   -   free
 *                   -   cash
 *                   -   special
 *          Status:
 *               type: boolean
 *               enum:
 *                   -   true
 *                   -   false
 */

//? Definition for lists
/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary text of course"
 *                                  text:
 *                                      type: string
 *                                      example: "text and describe of course"
 *                                  status:
 *                                      type: string
 *                                      example: "notStarted | Completed | Holding"
 *                                  time:
 *                                      type: string
 *                                      example: "01:22:34"
 *                                  price:
 *                                      type: integer
 *                                      example: 250,000
 *                                  discount:
 *                                      type: integer
 *                                      example: 20
 *                                  studendtCount:
 *                                      type: integer
 *                                      example: 340
 *                                  teacher:
 *                                      type: string
 *                                      example: "Mack Bill"
 */

//? Public Definition
/**
 * @swagger
 *  definitions:
 *      publicDefinition:
 *          type: object
 *          properties:
 *              statusCode :
 *                  type : integer
 *                  example : 20X
 *              data:
 *                  type : object
 *                  properties:
 *                       message:
 *                          type : string
 *                          example : "The best message for any Action"
 */

//? Main Schemas
/**
 * @swagger
 *  components:
 *      schemas:
 *          addChapter:
 *              type: object
 *              required :
 *                  -  id
 *                  -  title
 *              properties:
 *                  id :
 *                      type : string
 *                      example :
 *                  title :
 *                      type : string
 *                      example : Chapter 1- async JS
 *                  text :
 *                       type : string
 *                       example : description of chapter
 *          Insert-Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example:  Course's title
 *                  short_text:
 *                      type: string
 *                      description: the title of course
 *                      example: Some info ...
 *                  text:
 *                      type: string
 *                      description: the title of course
 *                      example: Write your body ..
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the category of course
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of course
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of course
 *                      example: 0
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/schemas/Types'
 *
 */

//? Get List
/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get all of courses
 *          parameters :
 *               -   in : query
 *                   name : search
 *                   type : string
 *                   description : Search in Course base on title,text and body
 *          responses :
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */

//? Create Course
/**
 * @swagger
 *  /admin/courses/add:
 *     post:
 *          tags: [Course(AdminPanel)]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Insert-Course'
 *          responses :
 *              201:
 *                  description: success
 *                  content :
 *                       application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
 */

//? Get A Single Course
/**
 * @swagger
 *  /admin/courses/{id}:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get a course by ObjectID
 *          parameters :
 *               -   in : path
 *                   name : id
 *                   type : string
 *                   description : find Course by ID
 *          responses :
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/courses/add-chapter:
 *      put:
 *          tags: [Course(AdminPanel)]
 *          summary: add a new Chapter for a course
 *          requestBody:
 *               required : true
 *               content :
 *                   application/x-www-form-urlencoded :
 *                         schema :
 *                              $ref : '#/components/schemas/addChapter'
 *                   application/json:
 *                         schema :
 *                              $ref : '#/components/schemas/addChapter'
 *          responses:
 *                  200 :
 *                      description : success
 *                      content :
 *                          application/json:
 *                              schema :
 *                                  $ref : '#/definitions/publicDefinition'
 *
 */
