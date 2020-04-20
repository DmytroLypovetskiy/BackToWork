const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/post');
const Profile = require('../../models/profile');
const Company = require('../../models/company');

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
      check('location', 'Location is required')
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

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        link: req.body.link,
        location: req.body.location,
        isActive: req.body.isActive,
        name: company.name,
        avatar: company.avatar,
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
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({
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

    // Check if the post has already been liked

    if (!post.isActive) {
      return res.status(400).json({
        msg: 'Post already archived'
      });
    }

    if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({
        msg: 'Post already archived'
      });
    }

    post.likes.unshift({
      user: req.user.id
    });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;