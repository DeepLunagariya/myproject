const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  }
});

// Corrected export
module.exports = mongoose.model('User', UserSchema);