const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/Users'); 
const router = express.Router();
const AWS = require('aws-sdk');
const upload = multer({ storage: multer.memoryStorage() });
const Photocard = require('../models/Photocard');
const Artist = require('../models/Artist'); 
const JWT_SECRET = process.env.JWT_SECRET;

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  
  const s3 = new AWS.S3();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

  // Upload to S3
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `images/${Date.now()}-${req.file.originalname}`, 
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      };
  
      // Upload the file to S3
      const data = await s3.upload(params).promise();
  
      res.json({
        success: true,
        imageUrl: data.Location
      });
    } catch (error) {
      console.error('Error uploading file:', error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  });


  router.post('/add-photocard', upload.single('image'), authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }
      const { artist_name, group, title, details, cost, type} = req.body;
      
  
      // Upload image to S3
      const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `images/${Date.now()}-${req.file.originalname}`, 
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      };
      const s3Data = await s3.upload(s3Params).promise();
  
      
      const photocard = new Photocard({
        owner_id: req.user.id,
        artist_name,  
        group,
        title,
        image: s3Data.Location,  // S3 URL for the image
        details,
        cost,
        type,
        posting_date: new Date()
      });
  
      // Save to MongoDB
      await photocard.save();
  
      res.json({ success: true, photocard });
    } catch (error) {
      console.error('Error adding photocard:', error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  module.exports = router;