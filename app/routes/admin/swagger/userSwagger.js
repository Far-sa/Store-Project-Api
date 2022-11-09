//? Get Users
/**
 * @swagger
 *  /admin/users/list:
 *      get:
 *          tags: [Users(AdminPanel)]
 *          summary: get all of Users
 *          parameters :
 *               -   in : query
 *                   name : search
 *                   type : string
 *                   description : Search in Users base on name,username,email and mobile
 *          responses :
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */
