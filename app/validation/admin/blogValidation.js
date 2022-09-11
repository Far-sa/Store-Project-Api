const createHttpError = require('http-errors')
const Joi = require('joi')
const { MongoIDPattern } = require('../../utils/constants')

exports.createBlogSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createError.BadRequest('Category title is invalid')),
  text: Joi.string().error(createHttpError.BadRequest('Enter a valid text')),
  short_text: Joi.string().error(
    createHttpError.BadRequest('Enter a Valid Text')
  ),
  filename: Joi.string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest('Enter a valid filename/format')),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(createHttpError.BadRequest('Tags must be less than 20 characters')),
  category: Joi.string()
    .pattern(MongoIDPattern)
    .error(createHttpError.BadRequest('Category was not found ')),
  fileUploadPath: Joi.allow()
})
