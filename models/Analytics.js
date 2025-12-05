const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  pageUrl: {
    type: String,
    required: true,
    trim: true
  },
  pageTitle: {
    type: String,
    default: ''
  },
  visitorId: {
    type: String,
    required: true,
    index: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  },
  referrer: {
    type: String,
    default: ''
  },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'unknown'],
    default: 'unknown'
  },
  browser: {
    type: String,
    default: ''
  },
  os: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  sessionDuration: {
    type: Number,
    default: 0
  }
});

// Indexes for better query performance
analyticsSchema.index({ timestamp: -1 });
analyticsSchema.index({ pageUrl: 1, timestamp: -1 });
analyticsSchema.index({ visitorId: 1, timestamp: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
