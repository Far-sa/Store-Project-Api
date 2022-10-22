const router = require('express').Router()

router.use('/category', require('./category'))
router.use('/blogs', require('./blog'))
router.use('/products', require('./product'))
router.use('/courses', require('./course'))
router.use('/chapters', require('./chapter'))
router.use('/episodes', require('./episode'))

module.exports = router
