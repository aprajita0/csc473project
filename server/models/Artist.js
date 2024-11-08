const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtistSchema = new mongoose.Schema({ 
    artist_name: { type: String, maxlength: 70 }
  });
  
  module.exports = mongoose.model('Artist', ArtistSchema);
