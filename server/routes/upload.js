const express = require('express');
const multer = require('multer');
const router = express.Router();
const AWS = require('aws-sdk');
const upload = multer({ storage: multer.memoryStorage() });
const Photocard = require('../models/Photocard');
const Artist = require('../models/Artist'); 

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  
  const s3 = new AWS.S3();

// Upload to S3
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      // Set S3 upload parameters without the ACL
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


  router.post('/add-photocard', upload.single('image'), async (req, res) => {
    try {
      const { artist_name, title, details, cost } = req.body;
      
  
      // Upload image to S3
      const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `images/${Date.now()}-${req.file.originalname}`, // Unique key for image
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      };
      const s3Data = await s3.upload(s3Params).promise();
  
      // Create photocard with the artist's ID and S3 URL
      const photocard = new Photocard({
        artist_name,  // Use the found or created artist's ID
        title,
        image: s3Data.Location,  // S3 URL for the image
        details,
        cost,
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
