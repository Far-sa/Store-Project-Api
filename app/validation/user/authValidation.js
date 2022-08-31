const joi = require('@hapi/joi')

const authSchema = joi.object({
  email: joi
    .string()
    .trim()
    .lowercase()
    .email()
    .required()
    .error(new Error('Please enter a valid email address')),
  password: joi
    .string()
    .trim()
    .min(5)
    .max(16)
    .required()
    .error(new Error('Please enter  6 to 16 character for password')),
  mobile: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error('Please enter a valid phone number'))
})

module.exports = authSchema
