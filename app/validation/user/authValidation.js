const createHttpError = require('http-errors')
const Joi = require('joi')

exports.getOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest('Please enter a valid phone number'))
})

exports.checkOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest('Please enter a valid phone number')),
  code: Joi.string()
    .min(4)
    .max(6)
    .error(createHttpError.BadRequest('Please enter a valid Code number'))
})
