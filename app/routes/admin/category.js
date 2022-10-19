const router = require('express').Router()

const {
  CategoryController
} = require('../../controller/admin/category.controller')



router.post('/add', CategoryController.addCategory)
router.get('/parents', CategoryController.getAllParents)
router.get('/children/:parent', CategoryController.getParentsChild)
router.get('/list', CategoryController.getAllCategory)
router.delete('/remove/:id', CategoryController.removeCategory)
router.get('/:id', CategoryController.getCategoryById)
router.patch('/update/:id', CategoryController.editCategoryTitle)

module.exports = router
