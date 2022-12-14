const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: {
      type: Object,
      default: {
        code: 0,
        expiresIn: 0
      }
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    Roles: { type: [String], default: 'USER' },
    courses: { type: [mongoose.Types.ObjectId], ref: 'course', default: [] }
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true
    }
  }
)

UserSchema.index({
  first_name: 'text',
  last_name: 'text',
  username: 'text',
  email: 'text',
  mobile: 'text'
})

module.exports = mongoose.model('user', UserSchema)
