const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Contact form submission (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin!' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email không hợp lệ!' });
    }

    // Create contact message
    const contact = new Contact({
      name,
      email,
      subject: subject || 'No subject',
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent') || ''
    });

    await contact.save();

    // TODO: Send email notification to admin
    // You can use nodemailer here
    
    console.log('New contact message:', { name, email, subject });

    res.json({ 
      success: true, 
      message: 'Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi sớm nhất có thể.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Có lỗi xảy ra, vui lòng thử lại!' });
  }
});

module.exports = router;
