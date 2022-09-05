const { default: mongoose } = require('mongoose')

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'category', default: undefined }
})

module.exports = mongoose.model('Category', CategorySchema)

//Web Developer
// => Back-End
// =>Front-ENd
//      => => title:
//      => =>parent : Web Developer ID

//IOT
//AI
