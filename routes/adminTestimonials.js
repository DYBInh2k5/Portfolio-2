const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Testimonial = require('../models/Testimonial');

// Apply auth middleware
router.use(authMiddleware);

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status === 'pending') query.approved = false;
    if (status === 'approved') query.approved = true;
    if (status === 'featured') query.featured = true;
    
    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 });
    
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create testimonial
router.post('/', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update testimonial
router.put('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Approve testimonial
router.patch('/:id/approve', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { 
        approved: true,
        approvedAt: new Date()
      },
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Toggle featured
router.patch('/:id/featured', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    testimonial.featured = !testimonial.featured;
    await testimonial.save();
    
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete testimonial
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await Testimonial.countDocuments();
    const pending = await Testimonial.countDocuments({ approved: false });
    const approved = await Testimonial.countDocuments({ approved: true });
    const featured = await Testimonial.countDocuments({ featured: true });
    
    const avgRating = await Testimonial.aggregate([
      { $match: { approved: true } },
      { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]);
    
    res.json({
      total,
      pending,
      approved,
      featured,
      averageRating: avgRating[0]?.avg || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
