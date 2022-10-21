//? Public Definition
/**
 * @swagger
 *  definitions:
 *      chaptersOfCourse:
 *          type: object
 *          properties:
 *              statusCode :
 *                  type : integer
 *                  example : 20X
 *              data:
 *                  type : object
 *                  properties:
 *                       course:
 *                          type : object
 *                          properties :
 *                              _id :
 *                                  type : string
 *                                  example : fgttf652rgth
 *                              title :
 *                                  type : string
 *                                  example : title
 *                              chapters :
 *                                  type : array
 *                                  items :
 *                                      type : object
 *                                  example : [{}]
 */

//? Main Schema
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
 *          editChapter:
 *              type: object
 *              properties:
 *                  title :
 *                      type : string
 *                      example : Chapter 1- async JS
 *                  text :
 *                       type : string
 *                       example : description of chapter
 */

//? Add Chapter
/**
 * @swagger
 *  /admin/chapters/add:
 *      put:
 *          tags: [Chapter(AdminPanel)]
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

//? Chapters of course
/**
 * @swagger
 *  /admin/chapters/list/{CourseID}:
 *      get:
 *          tags: [Chapter(AdminPanel)]
 *          summary: Get Chapters of a course
 *          parameters :
 *              -    in: path
 *                   type : string
 *                   required: true
 *                   name : CourseID
 *          responses:
 *                  200 :
 *                      description : success
 *                      content :
 *                          application/json:
 *                              schema :
 *                                  $ref : '#/definitions/chaptersOfCourse'
 *
 */

//? Delete a Chapter
/**
 * @swagger
 *  /admin/chapters/remove/{ChapterID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: remove a chapter  of a course
 *          parameters :
 *              -    in: path
 *                   type : string
 *                   required: true
 *                   name : ChapterID
 *          responses:
 *                  200 :
 *                      description : success
 *                      content :
 *                          application/json:
 *                              schema :
 *                                  $ref : '#/definitions/publicDefinition'
 *
 */

//? Update a Chapter
/**
 * @swagger
 *  /admin/chapters/update/{ChapterID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: update a chapter  of a course
 *          parameters :
 *              -    in: path
 *                   type : string
 *                   required: true
 *                   name : ChapterID
 *          requestBody :
 *              required: true
 *              content :
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : '#/components/schemas/editChapter'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/editChapter'
 *          responses:
 *                  200 :
 *                      description : success
 *                      content :
 *                          application/json:
 *                              schema :
 *                                  $ref : '#/definitions/publicDefinition'
 *
 */
