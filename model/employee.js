const mongoose = require('mongoose')

const schema = mongoose.Schema({
  _id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  bio: String,
  avatar: String
});

module.exports = mongoose.model('Employee', schema);