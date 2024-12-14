const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/Users'); 
const Photocard = require('../models/Photocard');
const Collection = require('../models/Collection');
const Comment = require('../models/Comment');
const router = express.Router();
const Message = require('../models/message');
const JWT_SECRET = process.env.JWT_SECRET;


// Middleware to verify token
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

router.post('/add-comment', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User does not exist.' });
        }
        const { photocard_id, comment } = req.body;

        if (!photocard_id || !comment) {
            return res.status(400).json({ error: 'Missing required fields: photocard_id or comment.' });
        }

        const photocard = await Photocard.findById(photocard_id);
        if (!photocard) {
            return res.status(404).json({ error: 'Photocard does not exist.' });
        }

        if (comment.length > 500) {
            return res.status(400).json({ error: 'Comment exceeds maximum length of 500 characters.' });
        }

        const newComment = new Comment({
            user: user._id,
            photocard: photocard_id,
            comment,
            date_added: Date.now()
        });

        await newComment.save();

        res.status(201).json({ 
            message: 'Comment added successfully', 
            comment: newComment 
        });

    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

router.get('/get-comments/:photocard_id', async (req, res) => {
    try {
        const photocard_id = req.params.photocard_id;
        const photocard = await Photocard.findById(photocard_id);
        if (!photocard) {
            return res.status(404).json({ error: 'Photocard does not exist.' });
        }

        const comments = await Comment.find({ photocard: photocard_id });
        res.status(200).json({ comments });

    } catch (error) {
        console.error('Error getting comments:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


module.exports = router;