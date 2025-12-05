const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Get all experience (public)
router.get('/', async (req, res) => {
  try {
    const experience = await Experience.find().sort({ order: 1, startDate: -1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
