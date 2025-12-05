const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

// Track page view (public)
router.post('/track', async (req, res) => {
  try {
    const {
      pageUrl,
      pageTitle,
      visitorId,
      sessionId,
      referrer,
      device,
      browser,
      os
    } = req.body;

    const analytics = new Analytics({
      pageUrl,
      pageTitle,
      visitorId,
      sessionId,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent') || '',
      referrer: referrer || '',
      device: device || 'unknown',
      browser: browser || '',
      os: os || ''
    });

    await analytics.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({ error: 'Failed to track' });
  }
});

// Update session duration (public)
router.patch('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { duration } = req.body;

    await Analytics.updateMany(
      { sessionId },
      { sessionDuration: duration }
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Session update error:', error);
    res.status(500).json({ error: 'Failed to update' });
  }
});

module.exports = router;
