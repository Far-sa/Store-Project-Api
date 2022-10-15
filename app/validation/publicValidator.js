const createHttpError = require('http-errors')
const Joi = require('joi')
const { MongoIDPattern } = require('../utils/constants')

const objectIdValidator = Joi.object({
  id: Joi.string()
    .pattern(MongoIDPattern)
    .error(new Error(createHttpError.BadRequest('Please enter a valid ID')))
})
module.exports = objectIdValidator
