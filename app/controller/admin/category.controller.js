const Controller = require('../controller')

const Category = require('../../models/category')
const createHttpError = require('http-errors')
const {
  addCategorySchema
} = require('../../validation/admin/categoryValidation')

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
    } catch (err) {
      next(err)
    }
  }
  async getCategoriesChild (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  CategoryController: new CategoryController()
}
