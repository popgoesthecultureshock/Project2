const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: String,
    googleId: { String, required: true },
    avatar: String,
    birthday: Date
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model
