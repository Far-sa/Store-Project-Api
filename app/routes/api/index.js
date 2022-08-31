const express = require('express')

const homeController = require('../../controller/api/home.controller')

const router = express.Router()

router.get('/', homeController.indexPage)

module.exports = router
