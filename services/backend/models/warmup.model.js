const mongoose = require('mongoose')

const Schema = mongoose.Schema

const warmup = new Schema({
  id: {type: Number, required: true, index: true},
  warmup: {type: String, required: true},
  time: {type: Number, required: true},
  tags: {type: Array, required: true},
}, {
  timestamps: true,
});

const Model = mongoose.model('Warmup', warmup)

module.exports = Model