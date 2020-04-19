const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  website: {
    type: String
  },
  location: {
    type: [String]
  },
  info: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);