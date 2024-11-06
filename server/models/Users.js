const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, maxlength: 25 },
    password: { type: String, required: true},
    email: { type: String, required: true},
    profile_pic: { type: String}, // URL to profile picture
    full_name: { type: String, maxlength: 100},
    bio: { type: String, maxlength: 300 },
    address_line1: { type: String, maxlength: 100 },
    address_line2: { type: String, maxlength: 100 }
  });
  
  module.exports = mongoose.model('User', UserSchema);