const mongoose = require('mongoose')
const { StatusCodes: HttpStatus } = require('http-status-codes')

const Controller = require('../../controller')
const Category = require('../../../models/category')
const createHttpError = require('http-errors')
const {
  addCategorySchema,
  updateCategorySchema
} = require('../../../validation/admin/categoryValidation')
const { result, $_validate } = require('@hapi/joi/lib/base')

class CategoryController extends Controller {
  async addCategory (req, res, next) {
    try {
      await addCategorySchema.validateAsync(req.body)
      const { title, parent } = req.body
      const category = await Category.create({ title, parent })
      if (!category)
        throw createHttpError.InternalServerError('Internal Server Error')
      return res.status(HttpStatus.CREATED).json({
        data: {
          statusCode: HttpStatus.CREATED,
          data: {
            message: 'Category has been created successfully'
          }
        }
      })
    } catch (err) {
      console.log(err.message)
      next(err)
    }
  }
  async removeCategory (req, res, next) {
    try {
      const { id } = req.params
      const category = await Category.findOne({ _id: id })
      if (!category) throw createHttpError.NotFound('category not found')
      const result = await Category.deleteMany({
        $or: [{ _id: category._id }, { parent: category._id }]
      })

      if (result.deletedCount == 0)
        throw createHttpError.InternalServerError('Server Error')
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          data: {
            message: 'Category deleted successfully'
          }
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async editCategoryTitle (req, res, next) {
    try {
      const { id } = req.params
      const { title } = req.body
      await updateCategorySchema.validateAsync(req.body)
      const category = await this.checkExistCategory(id)
      const resultOfUpdate = await Category.updateOne(
        { _id: id },
        { $set: { title } }
      )
      if (resultOfUpdate.modifiedCount == 0)
        throw createError.InternalServerError('Update Failed')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'Update was successfully Done. '
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async getAllCategory (req, res, next) {
    try {
      //* search for data => local = foreign then push result to another filed like as
      // const category = await Category.aggregate([
      //   {
      //     $lookup: {
      //       from: 'categories',
      //       as: 'children',
      //       localField: '_id',
      //       foreignField: 'parent'
      //     }
      //   },
      //   {
      //     $project: {
      //       __V: 0,
      //       'children.parent': 0,
      //       'children.__V': 0
      //     }
      //   }
      // ])

      //* use graphLookup in aggregate
      // const categories = await Category.aggregate([
      //   {
      //     $graphLookup: {
      //       from: 'categories',
      //       startWith: '$_id',
      //       connectFromField: '_id',
      //       connectToField: 'parent',
      //       maxDepth: 5,
      //       depthField: 'depth',
      //       as: 'children'
      //     }
      //   },
      //   {
      //     $project: {
      //       __V: 0,
      //       'children.parent': 0,
      //       'children.__V': 0
      //     }
      //   },
      //   {
      //     $match: {
      //       parent: undefined
      //     }
      //   }
      // ])
      const categories = await Category.find({ parent: undefined })

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          categories
        }
      })
    } catch (err) {
      console.log(err.message)
      next(err)
    }
  }
  async getCategoryById (req, res, next) {
    try {
      const { id } = req.params
      const category = await Category.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          }
        },
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: 'parent',
            as: 'children'
          }
        },
        {
          $project: {
            __V: 0,
            'children.parent': 0,
            'children.__V': 0
          }
        }
      ])
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          category
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async getAllParents (req, res, next) {
    try {
      const parents = await Category.find({ parent: undefined }, { __v: 0 })
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          parents
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async getParentsChild (req, res, next) {
    try {
      const { parent } = req.params
      const children = await Category.find({ parent })
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          children
        }
      })
    } catch (err) {
      console.log(err.message)
      next(err)
    }
  }
  async checkExistCategory (id) {
    const category = await CategoryModel.findById(id)
    if (!category) throw createError.NotFound('Category not found!')
    return category
  }
}

module.exports = {
  CategoryController: new CategoryController()
}
