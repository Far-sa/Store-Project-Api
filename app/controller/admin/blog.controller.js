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
      const blog = await Blog.create({
        title,
        text,
        image,
        short_text,
        tags,
        category
      })
      return res.status(201).json({ blog })
    } catch (err) {
      //? for deleting image file for any reason
      deleteFileInAddress(req.body.image)
      next(err)
    }
  }
  async getBlogs (req, res, next) {
    try {
      return res.status(200).json({
        statusCode: 200,
        data: {
          blogs: []
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
