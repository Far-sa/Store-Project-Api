const router = require('express').Router()

const {
  ProductsController
} = require('../../controller/admin/product.controller')

router.post('/add', ProductsController.addProduct)
router.patch('/update/:id', ProductsController.addProduct)
router.delete('/remove/:id', ProductsController.addProduct)
router.get('/list', ProductsController.addProduct)
router.get('/:id', ProductsController.addProduct)
router.post('/add', ProductsController.addProduct)

module.exports = router
