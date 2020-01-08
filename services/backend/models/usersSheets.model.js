const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSheets = new Schema({
  user_id: {type: Number, required: true, index: true},
  day1: {type: Date, required: true},
  day2: {type: Date, required: true},
}, {
  timestamps: true,
});

const Model = mongoose.model('UsersSheets', usersSheets)

module.exports = Model