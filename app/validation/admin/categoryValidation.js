const createHttpError = require('http-errors')
const Joi = require('joi')
const { MongoIDPattern } = require('../../utils/constants')

exports.addCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(10)
    .error(createHttpError.BadRequest('Please enter a valid title')),
  parent: Joi.string()
    .allow('')
    .pattern(MongoIDPattern)
    .allow('')
    .error(createHttpError.BadRequest('Please enter a valid parent id')),
  children: Joi.string()
    .allow('')
    .allow('')
    .error(createHttpError.BadRequest('Please enter a valid Child name'))
})

exports.updateCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest('category title is not valid'))
})
