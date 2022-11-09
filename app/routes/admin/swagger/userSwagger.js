//? Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-Profile:
 *              type : object
 *              properties:
 *                  first_name:
 *                      type : string
 *                      description : Name of User
 *                      example : Puppet
 *                  last_name:
 *                      type : string
 *                      description : Last name of User
 *                      example : puppet@puppet.com
 *                  email:
 *                      type : string
 *                      description :  user Email
 *                      example : Puppet
 *                  username:
 *                      type : string
 *                      description : username for User
 *                      example : Teo
 */
//? Definition
/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  first_name:
 *                                      type: string
 *                                      example: "user first_name"
 *                                  last_name:
 *                                      type: string
 *                                      example: "user last_name"
 *                                  username:
 *                                      type: string
 *                                      example: "username"
 *                                  email:
 *                                      type: string
 *                                      example: "the_user_email@example.com"
 *                                  mobile:
 *                                      type: string
 *                                      example: "986522354"
 */

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
 *                               $ref: '#/definitions/ListOfUsers'
 */

//? Update
/**
 * @swagger
 *  /admin/user/update-profile:
 *      patch:
 *          tags: [Users(AdminPanel)]
 *          summary: update user detail and profile
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
