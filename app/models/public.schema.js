const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'comment' }, // response
  comment: { type: String, required: true },
  createdAt: { type: Date, default: new Date().getTime() }
})

module.exports = commentSchema
