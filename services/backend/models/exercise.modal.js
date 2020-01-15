const mongoose = require('mongoose')

const Schema = mongoose.Schema

const exercise = new Schema({   // Table with all exercise
  id: {type: Number, required: true, index: true},
  exercise: {type: String, required: true},
  time: {type: Number, required: true},
  tags: {type: Array, required: true},
}, {
  timestamps: true,
});

const Model = mongoose.model('Exercise', exercise)

module.exports = Model