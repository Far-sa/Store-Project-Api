const path = require('path')
const { StatusCodes: HttpStatus } = require('http-status-codes')
const createHttpError = require('http-errors')

const { createBlogSchema } = require('../../validation/admin/blogValidation')
const Controller = require('../controller')
const Blog = require('../../models/blogs')
const { deleteFileInAddress } = require('../../utils/functions')

class BlogController extends Controller {
  async createBlog (req, res, next) {
    try {
      const blogDataBody = await createBlogSchema.validateAsync(req.body)

      //? join address+filename to Save image on DB
      req.body.image = path.join(
        blogDataBody.fileUploadPath,
        blogDataBody.filename
      )
      const { title, text, short_text, tags, category } = blogDataBody
      const image = req.body.image
      const author = req.user._id
      const blog = await Blog.create({
        title,
        text,
        image,
        short_text,
        tags,
        category,
        author
      })
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: 'Blog has been created successfully'
        }
      })
    } catch (err) {
      //? for deleting image file for any reason
      deleteFileInAddress(req.body.image)
      next(err)
    }
  }
  async getBlogs (req, res, next) {
    try {
      const blogs = await Blog.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: 'users',
            foreignField: '_id',
            localField: 'author',
            as: 'author'
          }
        },
        {
          $unwind: '$author'
        },
        {
          $lookup: {
            from: 'categories',
            foreignField: '_id',
            localField: 'category',
            as: 'category'
          }
        },
        {
          $unwind: '$category'
        },
        {
          $project: {
            'author.__v': 0,
            'category.__v': 0,
            'author.otp': 0,
            'author.Roles': 0,
            'author.discount': 0,
            'author.bills': 0
          }
        }
      ])
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          blogs
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async deleteBlogById (req, res, next) {
    try {
      const { id } = req.params
      const blog = await Blog.findOne({ _id: id })
      if (!blog) throw createHttpError.NotFound('Blog not found!')

      const result = await Blog.deleteOne({ _id: id })
      if (result.deletedCount == 0)
        throw createHttpError.InternalServerError('deleting process failed')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'Blog has been deleted'
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async updateBlogById (req, res, next) {
    try {
      const { id } = req.params
      const findBlog = await Blog.findOne({ _id: id })
      if (!findBlog) throw createHttpError.NotFound('Blog not found')

      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path.join(req.body.fileUploadPath, req.body.filename)
      }
      const author = req.user._id
      const data = req.body

      let blackListFields = [
        'likes',
        'dislikes',
        'author',
        'bookmarks',
        'comments'
      ]
      let nullishData = ['', ' ', '0', 0, null, undefined, NaN]

      Object.keys(data).forEach(key => {
        if (blackListFields.includes(data[key])) delete data[key]
        if (typeof data == 'string') data[key] = data[key].trim()
        if (Array.isArray(data[key]) && data.length > 0)
          data[key] = data[key].map(item => item.trim())
        if (nullishData.includes(data[key])) delete data[key]
      })
      const result = await Blog.updateOne({ _id: id }, { $set: data })
      if (result.modifiedCount == 0)
        throw createHttpError.InternalServerError('Update process failed')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: 'update process was done successfully'
        }
      })
    } catch (err) {
      deleteFileInAddress(req?.body?.image)
      console.log(err.message)
      next(err)
    }
  }
  async getBlogById (req, res, next) {
    try {
      const { id } = req.params
      // const path = await Blog.findOne({ _id: id }).getPopulatedPaths()
      // console.log(path)
      const blog = await Blog.findOne({ _id: id })
      // .populate([
      //   { path: 'Category', model: 'Category' },
      //   { path: 'author', model: 'User' }
      // ])

      if (!blog) throw createHttpError.NotFound('Blog not found!')
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          blog
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async getBlogsComments (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  BlogController: new BlogController()
}
