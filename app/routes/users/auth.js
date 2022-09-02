const router = require('express').Router()

const {
  UserAuthController
} = require('../../controller/users/auth/auth.controller')

/**
 * @swagger
 *   tags:
 *       name: User Authentication
 *       description: User-Auth Section
 */

/**
 * @swagger
 *  /user/get-otp:
 *       post:
 *           summary: Get OTP Code
 *           tags: [User Authentication]
 *           description: Login a user with OTP
 *           parameters:
 *           -    name : mobile
 *                description: fa-IRI Numbers
 *                in : formData
 *                required : true
 *                type: string
 *           responses:
 *                201:
 *                    description : Success
 *                400:
 *                    description : BadRequest
 *                401:
 *                    description : Unauthorized
 *                500:
 *                    description : InternalServerError
 */

router.post('/get-otp', UserAuthController.getOTP)

/**
 * @swagger
 *  /user/check-otp:
 *       post:
 *           summary: Check OTP Value
 *           tags: [User Authentication]
 *           description: Check OTP with mobile number
 *           parameters:
 *           -    name : mobile
 *                description: fa-IRI Numbers
 *                in : formData
 *                required : true
 *                type: string
 *           -    name : code
 *                description: Enter code
 *                in : formData
 *                required : true
 *                type: string
 *           responses:
 *                201:
 *                    description : Success
 *                400:
 *                    description : BadRequest
 *                401:
 *                    description : Unauthorized
 *                500:
 *                    description : InternalServerError
 */
router.post('/check-otp', UserAuthController.checkOtp)

/**
 * @swagger
 *   /user/refresh-token:
 *       post:
 *           summary: Send Refresh Token
 *           tags: [User Authentication]
 *           description: Refresh Token
 *           parameters:
 *           -    name : refreshToken
 *                description: Enter code
 *                in : body
 *                required : true
 *                type: string
 *           responses:
 *                201:
 *                    description : Success
 *                400:
 *                    description : BadRequest
 *                401:
 *                    description : Unauthorized
 *                500:
 *                    description : InternalServerError
 */
router.post('/refresh-token', UserAuthController.refreshToken)

module.exports = router
