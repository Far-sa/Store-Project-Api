const express = require('express')

const homeController = require('../../controller/api/home.controller')

const router = express.Router()

/**
 * @swagger
 * /:
 *  get:
 *     summary : Index Routes
 *     description : get all data in index route
 *     responses :
 *            200:
 *                 description : success
 *            404 :
 *                 description : failure
 */

router.get('/', homeController.indexPage)

module.exports = router
