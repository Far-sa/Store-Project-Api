const router = require('express').Router()

const {
  UserAuthController
} = require('../../controller/users/auth/auth.controller')
const { setHeaders } = require('../../middleware/Cors')

//? Create Schemas
/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: reviced code from getOTP
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: enter refresh-token for get fresh token and refresh-token
 */

//? Create Tags
/**
 * @swagger
 *  tags:
 *      name : User-Authentication
 *      description : user-auth section
 */

//? Get OTP
/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in user panel with phone number
 *          description: one time password(OTP) login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: UnAuthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post('/get-otp', setHeaders, UserAuthController.getOTP)

//? Check OTP
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags : [User-Authentication]
 *          summary: check-otp value in user controller
 *          description: check otp with mobile code and expires date
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: UnAuthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post('/check-otp', setHeaders, UserAuthController.checkOtp)

//? POST REFRESH-TOKEN
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: send refresh token for get new token and refresh token
 *          description : fresh token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *              200:
 *                  description : success
 */
router.post('/refresh-token', UserAuthController.refreshToken)

module.exports = router
