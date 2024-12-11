const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PhotocardSchema = new mongoose.Schema({
    owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    artist_name: { type: String, required: true},
    group: { type: String, required: true},
    title: { type: String, maxlength: 100 },
    image: {type: String, required: true},
    details: { type: String, maxlength: 300 },
    cost: { type: mongoose.Types.Decimal128, default: 0 }, 
    type: { type: String, enum: ['buying', 'selling'], required: true },
    posting_date: { type: Date, default: Date.now }

    
  });

  module.exports = mongoose.model('Photocard', PhotocardSchema);
  