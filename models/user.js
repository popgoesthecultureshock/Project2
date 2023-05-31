const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: String,
    googleId: { type: String, required: true },
    avatar: String,
    birthday: Date,
    dreams: [{ type: Schema.Types.ObjectId, ref: 'Dream' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
