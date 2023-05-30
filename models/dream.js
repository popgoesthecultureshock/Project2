const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dreamSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    date: Date,
    scale: {
      type: String,
      enum: ['Normal', 'Day', 'Lucid', 'False Awakening', 'Nightmare']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Dream', dreamSchema)
