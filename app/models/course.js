const mongoose = require('mongoose')

const commentSchema = require('./public.schema')

const EpisodesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: 'unlock' },
    time: { type: String, required: true },
    videoAddress: { type: String, required: true }
  },
  { toJSON: { virtuals: true } }
)
EpisodesSchema.virtual('videoURL').get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`
})

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  episodes: { type: [EpisodesSchema], default: [] }
})

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true, default: 'free' }, // Free/Cash/special
    tags: { type: [String], default: [] },
    time: { type: String, default: '00.00.00' },
    status: { type: String, default: 'notStarted' }, // started,completed
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    comments: { type: [commentSchema], default: [] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'category',
      required: true
    },
    teacher: { type: mongoose.Types.ObjectId, ref: 'user' },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    chapters: { type: [ChapterSchema], default: [] },
    students: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
)

CourseSchema.index({ title: 'text', short_text: 'text', text: 'text' })

CourseSchema.virtual('imageURL').get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})

module.exports = mongoose.model('course', CourseSchema)
