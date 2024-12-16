const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/Users'); 
const Photocard = require('../models/Photocard');
const Collection = require('../models/Collection');
const router = express.Router();
const Message = require('../models/message');
const JWT_SECRET = process.env.JWT_SECRET;

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

router.post('/send-message', authMiddleware, async (req, res) => {
    try {
        const { to_username, message } = req.body; 

        if (!to_username || !message) {
            return res.status(400).json({ error: 'Missing required fields: to_username or message.' });
        }

        const recipientUser = await User.findOne({ username: to_username });
        if (!recipientUser) {
            return res.status(404).json({ error: 'Recipient user does not exist.' });
        }

        
        const senderUser = await User.findById(req.user.id);
        if (!senderUser) {
            return res.status(404).json({ error: 'Sender user does not exist.' });
        }

        const newMessage = new Message({
            to_message: recipientUser._id,
            from_message: req.user.id,
            message
        });

        await newMessage.save();

        
        res.status(200).json({
            message: 'Message sent successfully.',
            data: {
                to_message: { id: recipientUser._id, username: recipientUser.username },
                from_message: { id: senderUser._id, username: senderUser.username },
                message: newMessage.message
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending message.', details: error.message });
    }
});

router.get('/get-messages', authMiddleware, async (req, res) => {
    try {
        

        const messages = await Message.find({ to_message: req.user.id })
            .populate('from_message', 'username')
            .sort({ timestamp: -1 });

        
        if (messages.length === 0) {
            return res.status(404).json({ message: 'No messages found for this user' });
        }

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error in get-messages:', error);
        res.status(500).json({ error: 'Error getting messages', details: error.message });
    }
});

router.post('/mark-as-read', authMiddleware, async (req, res) => {
    try {
        const user = req.user.id;
        const { message_id } = req.body;  

        
        if (!message_id) {
            return res.status(400).json({ error: 'Message ID is required' });
        }

        const message = await Message.findOne({ 
            _id: message_id, 
            to_message: user 
        });

        if (!message) {
            return res.status(404).json({ error: 'Message not found or not authorized.' });
        }

        message.is_read = true;
        await message.save();
        res.status(200).json({ message: 'Message marked as read', message });
    } catch (error) {
        res.status(500).json({ error: 'Error marking message as read', details: error.message });
    }
});

module.exports = router;