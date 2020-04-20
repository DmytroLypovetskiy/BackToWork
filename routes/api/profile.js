const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  check,
  validationResult
} = require('express-validator');

const Profile = require('../../models/profile');
const Company = require('../../models/company');

// @route   GET api/profile/me
// @desc    Get current companies profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      company: req.company.id
    }).populate('company', ['name', 'logo']);

    if (!profile) {
      return res.status(400).json({
        msg: 'There is no profile for this company'
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create or update company profile
// @access  Private
router.post(
  '/',
  auth,
  [
    check('info', 'Company info is required')
    .not()
    .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      company,
      website,
      locations,
      info
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.company = req.company.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (locations) {
      profileFields.locations = locations.split(',').map((location) => location.trim());
    }
    if (info) profileFields.info = info;

    try {
      let profile = await Profile.findOne({
        company: req.company.id
      });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate({
          company: req.company.id
        }, {
          $set: profileFields
        }, {
          new: true
        });

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('company', ['name', 'logo']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/company/:company_id
// @desc    Get profile by company ID
// @access  Public
router.get('/company/:company_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      company: req.params.company_id
    }).populate('company', ['name', 'logo']);

    if (!profile) return res.status(400).json({
      msg: 'Profile not found'
    });

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        msg: 'Profile not found'
      });
    }

    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, company & job listings
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove companies post

    // Remove profile
    await Profile.findOneAndRemove({
      company: req.company.id
    });
    // Remove company
    await Company.findOneAndRemove({
      _id: req.company.id
    });
    res.json({
      msg: 'Company deleted'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;