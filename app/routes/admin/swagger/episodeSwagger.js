/**
 * @swagger
 *  components:
 *      schemas:
 *          addEpisode:
 *              type : object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   time
 *                  -   type
 *              properties:
 *                  courseID:
 *                      type : string
 *                      example : 354sdefr65431dg21F
 *                  chapterID:
 *                      type : string
 *                      example : 354sdefr65431dg21F
 *                  title:
 *                      type : string
 *                      description : the title of episode
 *                      example : video number 1
 *                  time:
 *                      type : string
 *                      description : time of episode video
 *                      example : 00:06:45
 *                  type:
 *                      type : string
 *                      description: select episode type (lock/unlock)
 *                      enum :
 *                          -   unlock
 *                          -   lock
 *                  text:
 *                      type : string
 *                      description : information of episode
 *                      example : some info about the video
 */

//? Add Chapter
/**
 * @swagger
 *  /admin/episodes/add:
 *      post:
 *          tags: [Episode(AdminPanel)]
 *          summary: add a new Episode for a course
 *          requestBody:
 *               required : true
 *               content :
 *                   application/x-www-form-urlencoded :
 *                         schema :
 *                              $ref : '#/components/schemas/addEpisode'
 *                   application/json:
 *                         schema :
 *                              $ref : '#/components/schemas/addEpisode'
 *          responses:
 *                  200 :
 *                      description : success
 *                      content :
 *                          application/json:
 *                              schema :
 *                                  $ref : '#/definitions/publicDefinition'
 *
 */
