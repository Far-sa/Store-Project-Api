const Controller = require('../controller')

const Category = require('../../models/category')
const createHttpError = require('http-errors')
const {
  addCategorySchema
} = require('../../validation/admin/categoryValidation')
const { result } = require('@hapi/joi/lib/base')

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
      const category = await Category.aggregate([
        {
          $lookup: {
            from: 'categories',
            as: 'children',
            localField: '_id',
            foreignField: 'parent'
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
  async getCategoryById (req, res, next) {
    try {
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
