const mongoose = require('mongoose')

const commentSchema = require('./public.schema')

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  images: { type: [String], required: true },
  type: { type: String }, //virtual -physical
  tags: { type: [String], default: [] },
  format: { type: String },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  comments: { type: [commentSchema], default: [] },
  category: { type: mongoose.Types.ObjectId, ref: 'category' },
  supplier: { type: mongoose.Types.ObjectId },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  dislikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  features: {
    type: Object,
    default: {
      length: '',
      height: '',
      width: '',
      weight: '',
      originally: '',
      colors: [],
      madein: ''
    }
  }
})

ProductSchema.index({ title: 'text', text: 'text', type: 'text' })

ProductSchema.virtual('imagesURL').get(function () {
  return this.images.map(
    image => `${process.anv.BASE_URL}:${process.env.APPLICATION_PORT}/${image}`
  )
})

module.exports = mongoose.model('product', ProductSchema)
