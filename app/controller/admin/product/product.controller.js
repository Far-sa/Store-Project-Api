const { StatusCodes: HttpStatus } = require('http-status-codes')

const { ProductSchema } = require('../../../validation/admin/productValidation')

const {
  deleteFileInAddress,
  setFeatures,
  imagesListFromRQ,
  copyObject,
  deleteInvalidFieldsInObject
} = require('../../../utils/functions')
const Controller = require('../../controller')

const Product = require('../../../models/products')
const objectIdValidator = require('../../../validation/publicValidator')
const createHttpError = require('http-errors')

const ProductBlackList = {
  BOOKMARKS: 'bookmarks',
  LIKES: 'likes',
  DISLIKES: 'dislikes',
  COMMENTS: 'comments',
  SUPPLIER: 'supplier',
  WEIGHT: 'weight',
  WIDTH: 'width',
  LENGTH: 'length',
  HEIGHT: 'height',
  COLORS: 'colors'
}
Object.freeze(ProductBlackList)

class ProductController extends Controller {
  async addProduct (req, res, next) {
    try {
      //? import Log
      //return console.log(req.body.fileUploadPath, req.files)
      const images = imagesListFromRQ(req?.files || [], req.body.fileUploadPath)
      const productBody = await ProductSchema.validateAsync(req.body)

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
        images,
        supplier,
        type,
        features
      })
      return res.status(HttpStatus.CREATED).json({
        data: {
          statusCod: HttpStatus.CREATED,
          data: {
            message: 'Product has been added successfully'
          }
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
      const { id } = req.params
      const product = await this.findProductById(id)

      const data = copyObject(req.body)
      data.images = imagesListFromRQ(req?.files || [], req.body.fileUploadPath)
      data.features = setFeatures(req.body)

      let blackListFields = Object.values(ProductBlackList)
      deleteInvalidFieldsInObject(data, blackListFields)

      const updatedResult = await Product.updateOne(
        { _id: product._id },
        { $set: data }
      )
      if (updatedResult.modifiedCount == 0)
        throw HttpStatus.INTERNAL_SERVER_ERROR('Internal Server Error')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'Product updated successfully'
        }
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  async removeProductById (req, res, next) {
    try {
      const { id } = req.params
      const product = await this.findProductById(id)
      const removeResult = await Product.deleteOne({ id: product._id })
      if (removeResult.deletedCount == 0)
        throw createHttpError.InternalServerError('deleting process failed')
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          data: {
            message: 'Product has been deleted successfully'
          }
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async getAllProduct (req, res, next) {
    try {
      const search = req.query.search
      let products
      if (search) {
        products = await Product.find({
          $text: {
            $search: search
          }
        })
      } else {
        products = await Product.find({})
      }
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          data: {
            products
          }
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async getSingleProduct (req, res, next) {
    try {
      const { id } = req.params
      const product = await this.findProductById(id)
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          data: {
            product
          }
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async findProductById (productId) {
    const { id } = await objectIdValidator.validateAsync({ id: productId })
    const product = await Product.findById(id)
    if (!product) throw createHttpError.NotFound('Product was not found')
    return product
  }
}

module.exports = {
  ProductsController: new ProductController()
}
