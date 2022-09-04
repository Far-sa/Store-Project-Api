const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { randomNumberGenerator } = require('../utils/functions')

/**
 * @swagger
 *  tags:
 *       name : Developer-Routes
 *       description : Developer Utils
 */

/**
 * @swagger
 *  /developer/hash-password/{password}:
 *     get:
 *         tags: [Developer-Routes]
 *         summary: hash passwords with bcrypt
 *         parameters:
 *           -    name : password
 *                in :  path
 *                required : true
 *                type : string
 *         responses :
 *                    200:
 *                       description: success
 *
 */
router.get('/hash-password/:password', (req, res, next) => {
  const { password } = req.params
  const result = bcrypt.hashSync(password, 10)
  return res.send(result)
})

/**
 * @swagger
 *  tags:
 *       name : Developer-Routes
 *       description : Developer Utils
 */

/**
 * @swagger
 *  /developer/random-code-generator:
 *     get:
 *         tags: [Developer-Routes]
 *         summary: get random number
 *         responses :
 *                    200:
 *                       description: success
 */
router.get('/random-code-generator', (req, res, next) => {
  return res.send(randomNumberGenerator().toString())
})

module.exports = router
