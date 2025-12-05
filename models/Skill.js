const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'database', 'tools', 'other'],
    default: 'other'
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
    default: 50
  },
  icon: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Skill', skillSchema);
