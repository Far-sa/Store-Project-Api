const Joi = require('joi')

const authSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error('Please enter a valid phone number'))
})

module.exports = authSchema
