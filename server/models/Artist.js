const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtistSchema = new mongoose.Schema({
    username: { type: String, required: true, maxlength: 25 },
    password: { type: String, required: true},
    email: { type: String, required: true},
    profile_pic: { type: String}, 
    full_name: { type: String, maxlength: 50 },
    bio: { type: String, maxlength: 300 },
    address_line1: { type: String, maxlength: 100 },
    address_line2: { type: String, maxlength: 100 }
  });
  
  module.exports = mongoose.model('Artist', ArtistSchemaSchema);