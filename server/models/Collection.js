const mongoose = require('mongoose');
const { Schema } = mongoose;

const CollectionSchema = new mongoose.Schema({
    owner_id: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    collection_name: { type: String, default: 'My Collection' },
    photocard_id: { type: Schema.Types.ObjectId, required: true, ref: 'Photocard'},
    date_added: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Collection', CollectionSchema);
  