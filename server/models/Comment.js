const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    photocard: { type: Schema.Types.ObjectId, required: true, ref: 'Photocard'},
    comment: { type: String, required: true },
    date_added: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Comment', CommentSchema);