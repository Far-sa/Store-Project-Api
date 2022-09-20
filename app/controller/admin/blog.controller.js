const Controller = require('../controller')

class BlogController extends Controller {
  async createBlog (req, res, next) {
    try {
      return res.status(201).json({
        data: {
          statusCode: 201
        }
      })
    } catch (err) {
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
