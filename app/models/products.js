const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  info: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  type: { type: String, required: true },
  tags: { type: [String], default: [] },
  time: { type: String },
  format: { type: String },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  comments: { type: [], default: [] },
  category: { type: mongoose.Types.ObjectId, required: true },
  teacher: { type: mongoose.Types.ObjectId },
  like: { type: [mongoose.Types.ObjectId], default: [] },
  dislike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  details: {
    type: {},
    default: {
      length: '',
      height: '',
      width: '',
      weight: '',
      originally: '',
      colors: [],
      models: []
    }
  }
})

module.exports = mongoose.model('Product', ProductSchema)
