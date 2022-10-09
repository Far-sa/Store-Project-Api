const { createBlogSchema } = require('../../validation/admin/blogValidation')
const Controller = require('../controller')
const path = require('path')
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
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: 'Blog has been created successfully'
        }
      })
    } catch (err) {
      //? for deleting image file for any reason
      deleteFileInAddress(image)
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
      return res.status(200).json({
        data: {
          statusCode: 200,
          blogs
        }
      })
    } catch (err) {
      next(err)
    }
  }
  async deleteBlogById (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async updateBlogById (req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async getBlogById (req, res, next) {
    try {
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
