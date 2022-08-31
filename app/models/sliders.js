const mongoose = require('mongoose')

const SliderSchema = new mongoose.Schema({
  title: { type: String },
  text: { type: String },
  image: { type: String, required: true },
  type: { type: String, default: '' }
})

module.exports = mongoose.model('slider', SliderSchema)
