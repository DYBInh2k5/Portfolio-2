const express = require('express');
const router = express.Router();
const About = require('../models/About');

// Get about info (public)
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ error: 'About info not found' });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
