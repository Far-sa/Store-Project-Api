const path = require('path')

const { ProductSchema } = require('../../validation/admin/productValidation')

const { deleteFileInAddress, setFeatures } = require('../../utils/functions')
const Controller = require('../controller')

const Product = require('../../models/products')

class ProductController extends Controller {
  async addProduct (req, res, next) {
    try {
      const productBody = await ProductSchema.validateAsync(req.body)
      //? join address+filename to Save image on DB
      req.body.image = path.join(
        productBody.fileUploadPath,
        productBody.filename
      )
      const image = req.body.image

      const {
        title,
        text,
        short_text,
        category,
        tags,
        count,
        price,
        discount,
        type
      } = productBody

      let features = setFeatures(req.body)
      const supplier = req.user._id

      const product = await Product.create({
        title,
        text,
        short_text,
        price,
        count,
        discount,
        category,
        tags,
        image,
        supplier,
        type,
        features
      })
      return res.status(201).json({
        data: {
          statusCod: 201,
          message: 'Product has been added successfully'
        }
      })
    } catch (err) {
      console.log(err.message)
      //? for deleting image file for any reason
      deleteFileInAddress(req.body.image)
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
      const products = await Product.find({})
      return res.status(200).json({
        data: {
          statusCode: 200,
          products
        }
      })
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
