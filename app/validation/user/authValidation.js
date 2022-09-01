const Joi = require('joi')

exports.getOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error('Please enter a valid phone number'))
})

exports.checkOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error('Please enter a valid phone number')),
  code: Joi.string()
    .min(4)
    .max(6)
    .error(new Error('Please enter a valid Code number'))
})
