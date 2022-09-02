const express = require('express')

const homeController = require('../../controller/api/home.controller')
const { authenticated } = require('../../middleware/authenticate')

const router = express.Router()
/**
 * @swagger
 * tags:
 *      name : Index Page
 *      description : Main APIS for website
 */

/**
 * @swagger
 * /:
 *  get:
 *     summary : Index Routes
 *     tags : [Index Page]
 *     description : get all data in index route
 *     parameters :
 *      -          in : header
 *                 name : access-token
 *                 example : Bearer Token
 *     responses :
 *            200:
 *                 description : success
 *            404 :
 *                 description : failure
 */

router.get('/', authenticated, homeController.indexPage)

module.exports = router
