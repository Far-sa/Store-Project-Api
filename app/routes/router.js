const express = require('express')

const router = express.Router()

router.use('/user', require('./users/auth'))
router.use('/', require('./api/index'))

module.exports = router
