const Controller = require('../controller')

class ProductController extends Controller {
  async addProduct (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async editProduct (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async removeProduct (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async getAllProduct (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async getSingleProduct (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  ProductsController: new ProductController()
}
