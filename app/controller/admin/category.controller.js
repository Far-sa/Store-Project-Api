const Controller = require('../controller')
const mongoose = require('mongoose')

const Category = require('../../models/category')
const createHttpError = require('http-errors')
const {
  addCategorySchema
} = require('../../validation/admin/categoryValidation')
const { result, $_validate } = require('@hapi/joi/lib/base')

class CategoryController extends Controller {
  async addCategory (req, res, next) {
    try {
      await addCategorySchema.validateAsync(req.body)
      const { title, parent } = req.body
      const category = await Category.create({ title, parent })
      if (!category)
        throw createHttpError.InternalServerError('Internal Server Error')
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: 'Category has been created successfully'
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
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: 'Category deleted successfully'
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async updateCategory (req, res, next) {
    try {
    } catch (err) {
      next(err)
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

      return res.status(200).json({
        data: {
          statusCode: 200,
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
      return res.status(200).json({
        data: {
          statusCode: 200,
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
      res.status(200).json({
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
      return res.status(200).json({
        data: {
          children
        }
      })
    } catch (err) {
      console.log(err.message)
      next(err)
    }
  }
}

module.exports = {
  CategoryController: new CategoryController()
}
