const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    permissions: {
      type: [mongoose.Types.ObjectId],
      ref: 'permission',
      default: []
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
)

module.exports = RoleSchema.model('role', RoleSchema)
