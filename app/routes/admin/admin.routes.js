const router = require('express').Router()

/**
 * @swagger
 *   tags:
 *       -  name: Admin-Panel
 *          description: Admin Actions (add,  edit, delete, etc.)
 *       -  name: Course(AdminPanel)
 *          description: All courses routes (add,  edit, delete , etc .)
 *       -  name : Product(AdminPanel)
 *          description: All Products Route (add,edit,delete ,etc ..)
 *       -  name: Category(AdminPanel)
 *          description: All Categories Routes (add,  edit, delete, etc.)
 *       -  name: Blogs(AdminPanel)
 *          description: All Blogs Routes (add,  edit, delete, etc.)
 */

router.use('/category', require('./category'))
router.use('/blogs', require('./blog'))
router.use('/products', require('./product'))
router.use('/courses', require('./course'))

module.exports = router
