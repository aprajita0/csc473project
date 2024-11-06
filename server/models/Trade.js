const mongoose = require('mongoose');
const { Schema } = mongoose;

const TradeSchema = new mongoose.Schema({
    buyer_id: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    seller_id: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    photocard_id: { type: Schema.Types.ObjectId, required: true, ref: 'Photocard'},
    status: { type: String, enum: ['pending', 'completed', 'canceled'], required: true },
    trade_date: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Trade', TradeSchema);
  