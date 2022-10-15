const createHttpError = require('http-errors')
const Joi = require('joi')
const { MongoIDPattern } = require('../../utils/constants')

//const MongoIDPattern = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

exports.ProductSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(createHttpError.BadRequest('Category title is invalid')),
  text: Joi.string()
    .required()
    .error(createHttpError.BadRequest('Enter a valid text')),
  short_text: Joi.string()
    .required()
    .error(createHttpError.BadRequest('Enter a Valid Text')),
  price: Joi.number().error(createHttpError.BadRequest('Enter a valid Price')),
  count: Joi.number().error(
    createHttpError.BadRequest('Please enter a valid Count')
  ),
  discount: Joi.number().error(
    createHttpError.BadRequest('Please Enter a valid discount format')
  ),
  colors: Joi.array()
    .min(0)
    .max(20)
    .required(),
  weight: Joi.number()
    .allow(null, 0, '0')
    .error(createHttpError.BadRequest('')),
  length: Joi.number()
    .allow(null, 0, '0')
    .error(createHttpError.BadRequest('')),
  height: Joi.number()
    .allow(null, 0, '0')
    .error(createHttpError.BadRequest('')),
  width: Joi.number()
    .allow(null, 0, '0')
    .error(createHttpError.BadRequest('')),
  category: Joi.string()
    .pattern(MongoIDPattern)
    .error(createHttpError.BadRequest('Category was not found ')),
  tags: Joi.array().required(),
  type: Joi.string().regex(/(virtual|physical)/i),
  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest('Enter a valid filename/format')),
  fileUploadPath: Joi.allow()
})
