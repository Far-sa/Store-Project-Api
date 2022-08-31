const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, required: true },
  mobile: { type: String },
  email: { type: String },
  password: { type: String },
  otp: { type: object, default: { code: 0, expires: 0 } },
  bills: { type: [], default: [] },
  discount: { type: Number, default: 0 },
  birthday: { type: String },
  rolls: { type: [String], default: 'USER' }
})

module.exports = mongoose.model('User', UserSchema)
