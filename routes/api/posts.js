const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Company = require('../../models/Company');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
      .not()
      .isEmpty(),
      check('text', 'Text is required')
      .not()
      .isEmpty(),
      check('link', 'Link is required')
      .not()
      .isEmpty(),
      check('locations', 'Location is required')
      .isLength({
        min: 1
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {
      const company = await Company.findById(req.company.id).select('-password');

      const {
        title,
        text,
        link,
        locations,
        isActive
      } = req.body;

      // Build post object
      const postFields = {};
      if (title) postFields.title = title;
      if (text) postFields.text = text;
      if (link) postFields.link = link;
      if (locations) {
        postFields.locations = locations.split(',').map((location) => location.trim());
      }
      if (isActive) postFields.isActive = isActive;

      const newPost = new Post({
        ...postFields,
        name: company.name,
        logo: company.logo,
        company: req.company.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all active posts 
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ isActive: true }).sort({
      date: -1
    }); // newest first
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts
// @desc    Get all active and anactive posts for signed company
// @access  Public
router.get('/logged', auth, async (req, res) => {
  try {
    const posts = await Post.find({ $or: [
      { isActive: true },
      { company: req.company.id }
    ] }).sort({
      date: -1
    }); // newest first

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }

    // Check company
    if (post.company.toString() !== req.company.id) {
      return res.status(401).json({
        msg: 'Company not authorized'
      });
    }

    await post.remove();

    res.json({
      msg: 'Post removed'
    });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/archive/:id
// @desc    Archive a post
// @access  Private
router.put('/archive/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been archived
    if (!post.isActive) {
      return res.status(400).json({
        msg: 'Post already archived'
      });
    }

    post.isActive = false;

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unarchive/:id
// @desc    Unarchive a post
// @access  Private
router.put('/unarchive/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }

    // Check company
    if (post.company.toString() !== req.company.id) {
      return res.status(401).json({
        msg: 'Company not authorized'
      });
    }

    // Check if the post has already been archived
    if (post.isActive) {
      return res.status(400).json({
        msg: 'Post is already active'
      });
    }

    post.isActive = true;

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;