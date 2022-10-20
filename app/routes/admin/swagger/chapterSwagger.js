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
