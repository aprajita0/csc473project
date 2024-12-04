const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new mongoose.Schema({
    to_message: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    from_message: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    is_read: { type: Boolean, default: false },
    });

module.exports = mongoose.model('Message', MessageSchema);
