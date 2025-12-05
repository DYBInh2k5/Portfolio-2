const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Analytics = require('../models/Analytics');

// Apply auth middleware
router.use(authMiddleware);

// Get analytics summary
router.get('/summary', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    // Total views
    const totalViews = await Analytics.countDocuments({
      timestamp: { $gte: startDate }
    });

    // Unique visitors
    const uniqueVisitors = await Analytics.distinct('visitorId', {
      timestamp: { $gte: startDate }
    });

    // Popular pages
    const popularPages = await Analytics.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { $group: { _id: '$pageUrl', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Views by day
    const viewsByDay = await Analytics.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Device breakdown
    const deviceBreakdown = await Analytics.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { $group: { _id: '$device', count: { $sum: 1 } } }
    ]);

    // Top referrers
    const topReferrers = await Analytics.aggregate([
      { 
        $match: { 
          timestamp: { $gte: startDate },
          referrer: { $ne: '' }
        } 
      },
      { $group: { _id: '$referrer', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      totalViews,
      uniqueVisitors: uniqueVisitors.length,
      popularPages,
      viewsByDay,
      deviceBreakdown,
      topReferrers
    });
  } catch (error) {
    console.error('Analytics summary error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get real-time stats
router.get('/realtime', async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const activeVisitors = await Analytics.distinct('visitorId', {
      timestamp: { $gte: fiveMinutesAgo }
    });

    const recentPages = await Analytics.find({
      timestamp: { $gte: fiveMinutesAgo }
    })
    .sort({ timestamp: -1 })
    .limit(20)
    .select('pageUrl timestamp');

    res.json({
      activeVisitors: activeVisitors.length,
      recentPages
    });
  } catch (error) {
    console.error('Realtime analytics error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
