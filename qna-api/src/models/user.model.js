const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 255,
    unique: true
  }
});

module.exports.User = mongoose.model('User', userSchema);
