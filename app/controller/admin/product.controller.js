const path = require('path')

const { ProductSchema } = require('../../validation/admin/productValidation')

const { deleteFileInAddress } = require('../../utils/functions')
const Controller = require('../controller')

const Product = require('../../models/products')

class ProductController extends Controller {
  async addProduct (req, res, next) {
    try {
      const productBody = await ProductSchema.validateAsync(req.body)
      //? join address+filename to Save image on DB
      req.body.image = path.join(req.body.fileUploadPath, req.body.filename)
      const image = req.body.image
      const {
        title,
        text,
        short_text,
        category,
        tags,
        count,
        price,
        discount
      } = productBody
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
        supplier
      })
      return res.status(201).json({
        statusCod: 201
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
