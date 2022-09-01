const router = require('express').Router()

const {
  UserAuthController
} = require('../../controller/users/auth/auth.controller')

//@ Desc Register
//@ Route POST /user/register
router.post('/register')

/**
 * @swagger
 *   tags:
 *       name: User Authentication
 *       description: User-Auth Section
 */

/**
 * @swagger
 *  /user/login:
 *       post:
 *           summary: Login User
 *           tags: [User Authentication]
 *           description: Login a user with OTP password
 *           parameters:
 *           -    name : Mobile
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

router.post('/login', UserAuthController.login)

module.exports = router
