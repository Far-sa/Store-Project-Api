const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      default: undefined
    }
  },
  {
    id: false,
    toJSON: {
      virtuals: true
    }
  }
)

CategorySchema.virtual('children', {
  ref: 'category',
  localField: '_id',
  foreignField: 'parent'
})

function autoPopulate (next) {
  this.populate([{ path: 'children', select: { __v: 0 } }])
  next()
}

CategorySchema.pre('findOne', autoPopulate).pre('find', autoPopulate)

module.exports = mongoose.model('category', CategorySchema)

//Web Developer
// => Back-End
// =>Front-ENd
//      => => title:
//      => =>parent : Web Developer ID

//IOT
//AI
