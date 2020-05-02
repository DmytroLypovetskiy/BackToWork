const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
  check,
  validationResult
} = require('express-validator');

const Company = require('../../models/company');

// @route   POST api/companies
// @desc    Register company
// @access  Public
router.post(
  '/',
  [
    check('name', 'Company name is required').not().isEmpty(),
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Enter a password with 6 or more characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      password
    } = req.body;

    try {
      let company = await Company.findOne({
        email
      });

      if (company) {
        return res.status(400).json({
          errors: [{
            msg: 'Company already exists'
          }]
        });
      }

      const logo = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      company = new Company({
        name,
        email,
        logo,
        password
      });

      const salt = await bcrypt.genSalt(10);

      company.password = await bcrypt.hash(password, salt);

      await company.save();

      const payload = {
        company: {
          id: company.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'), {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;