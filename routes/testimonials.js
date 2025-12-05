const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// Get approved testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true })
      .sort({ featured: -1, order: 1, createdAt: -1 });
    
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get featured testimonials (public)
router.get('/featured', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ 
      approved: true, 
      featured: true 
    })
    .sort({ order: 1 })
    .limit(6);
    
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit testimonial (public)
router.post('/submit', async (req, res) => {
  try {
    const { name, position, company, content, rating, email } = req.body;

    if (!name || !position || !content) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin!' });
    }

    const testimonial = new Testimonial({
      name,
      position,
      company: company || '',
      content,
      rating: rating || 5,
      email: email || '',
      approved: false
    });

    await testimonial.save();

    res.json({ 
      success: true, 
      message: 'Cảm ơn bạn! Testimonial của bạn đang chờ duyệt.' 
    });
  } catch (error) {
    console.error('Testimonial submit error:', error);
    res.status(500).json({ error: 'Có lỗi xảy ra!' });
  }
});

module.exports = router;
