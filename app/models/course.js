const mongoose = require('mongoose')

const commentSchema = require('./public.schema')

const EpisodesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: 'free' },
  time: { type: String, required: true }
})

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  episodes: { type: [EpisodesSchema], default: [] }
})

const CourseSchema = new mongoose.Schema({
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
  category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
  teacher: { type: mongoose.Types.ObjectId, ref: 'user' },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  dislikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  chapters: { type: [ChapterSchema], default: [] },
  students: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] }
})

CourseSchema.index({ title: 'text', short_text: 'text', text: 'text' })

module.exports = mongoose.model('Course', CourseSchema)
