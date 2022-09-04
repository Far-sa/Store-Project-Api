const router = require('express').Router()

/**
 * @swagger
 *   tags:
 *        name: Admin-Panel
 *        description: Admin Actions
 */

router.use('/category', require('./category'))

module.exports = router
