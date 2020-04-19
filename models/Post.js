const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'companies'
  },
  text: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);