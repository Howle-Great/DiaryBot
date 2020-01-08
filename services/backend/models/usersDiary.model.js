const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersDiary = new Schema({
  user_id: {type: Number, required: true, index: true},
  day: {type: Date, required: true},
  description: {type: String, required: true},
  time: {type: Number, required: true},
  pulseBefor: {type: Number, required: true},
  pulseAfter: {type: Number, required: true},
  stateOfHealth: {type: Number, required: true},
  wish: {type: Boolean, required: true},
}, {
  timestamps: true,
});

const Model = mongoose.model('UsersDiary', usersDiary)

module.exports = Model