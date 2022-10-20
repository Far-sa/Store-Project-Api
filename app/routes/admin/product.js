const router = require('express').Router()

const {
  ProductsController
} = require('../../controller/admin/product/product.controller')
const { stringToArray } = require('../../middleware/stringToArray')
const { uploadFile } = require('../../utils/multer')

router.post(
  '/add',
  uploadFile.array('images', 10),
  stringToArray('tags', 'colors'),
  ProductsController.addProduct
)
router.get('/list', ProductsController.getAllProduct)
router.get('/:id', ProductsController.getSingleProduct)
router.delete('/remove/:id', ProductsController.removeProductById)
router.patch(
  '/edit/:id',
  uploadFile.array('images', 10),
  stringToArray('tags', 'colors'),
  ProductsController.editProduct
)

module.exports = router
