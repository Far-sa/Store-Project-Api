const createHttpError = require('http-errors')
const Joi = require('joi')
const { MongoIDPattern } = require('../../utils/constants')

//const MongoIDPattern = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

exports.CourseSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(createHttpError.BadRequest('Course title is invalid')),
  text: Joi.string()
    .required()
    .error(createHttpError.BadRequest('Enter a valid text')),
  short_text: Joi.string()
    .required()
    .error(createHttpError.BadRequest('Enter a Valid Text')),
  price: Joi.number().error(createHttpError.BadRequest('Enter a valid Price')),

  discount: Joi.number().error(
    createHttpError.BadRequest('Please Enter a valid discount format')
  ),
  category: Joi.string()
    .pattern(MongoIDPattern)
    .error(createHttpError.BadRequest('Course was not found ')),
  tags: Joi.array().required(),
  type: Joi.string().regex(/(free|cash|special)/i),
  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest('Enter a valid filename/format')),
  fileUploadPath: Joi.allow()
})
