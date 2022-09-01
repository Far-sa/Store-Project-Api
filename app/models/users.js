const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, trim: true, lowercase: true },
  mobile: { type: String, required: true },
  email: { type: String, lowercase: true, trim: true },
  password: { type: String },
  otp: { type: Object, default: { code: 0, expiresIn: 0 } },
  bills: { type: [], default: [] },
  discount: { type: Number, default: 0 },
  birthday: { type: String },
  rolls: { type: [String], default: 'USER' }
})

module.exports = mongoose.model('User', UserSchema)
