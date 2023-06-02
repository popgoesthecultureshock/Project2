const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema(
  {
    content: String,
    updated: Date
  },
  {
    timestamps: true
  }
)

const dreamSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    date: Date,
    scale: {
      type: String,
      enum: [
        'Normal Night',
        'Day Dream',
        'Lucid Dream',
        'False Awakening',
        'Nightmare'
      ]
    },
    notes: [noteSchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Dream', dreamSchema)
