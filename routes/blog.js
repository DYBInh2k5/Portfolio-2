const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all published blog posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find({ published: true })
      .sort({ publishedAt: -1 })
      .select('-content');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single blog post by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Increment views
    post.views += 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get posts by tag (public)
router.get('/tag/:tag', async (req, res) => {
  try {
    const posts = await Blog.find({ 
      published: true, 
      tags: req.params.tag 
    })
    .sort({ publishedAt: -1 })
    .select('-content');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
