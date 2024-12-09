const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/Users'); 
const Photocard = require('../models/Photocard');
const Collection = require('../models/Collection');
const router = express.Router();
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

// Registration endpoint
router.post('/register', async (req, res) => {
    const { username, password, email} = req.body;

    try {

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            username,
            password: hashedPassword,
            email
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user', details: err.message });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        
        const token = jwt.sign(
            { id: user._id.toString(), username: user.username }, // Convert `_id` to string
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token, userid: user._id });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in', details: err.message });
    }
});

// Get user profile endpoint
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

router.post('/editProfile', authMiddleware, async (req, res) => {
    const allowedUpdates = [
        'username',
        'email',
        'profile_pic',
        'full_name',
        'bio',
        'address_line1',
        'address_line2'
    ]; 

    const updates = Object.keys(req.body); 
    const isValidOperation = updates.every(field => allowedUpdates.includes(field));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Update fields dynamically
        updates.forEach(field => {
            user[field] = req.body[field];
        });

        await user.save(); 
        res.status(200).json({ message: 'Profile updated successfully.', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

router.get('/photocards', async (req, res) => {
    try {
        // Retrieve all photocards from the database
        const photocards = await Photocard.find();

        // Respond with the retrieved photocards
        res.status(200).json({ photocards });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching photocards', details: error.message });
    }
});

router.post('/add-photocard-collection', authMiddleware, async (req, res) => {
    try {
        const { photocard_id } = req.body;
        const photocard = await Photocard.findById(photocard_id);
        
        if (!photocard) {
            return res.status(404).json({ error: 'Photocard not found.' });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const collection = new Collection({
            owner_id: req.user.id, 
            photocard_id: photocard_id
        });

        await collection.save();
        res.status(201).json({ message: 'Photocard added to collection successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding photocard to collection', details: error.message });
    }
});

router.post('/add-photocard-collection-name', authMiddleware, async (req, res) => {
    try {
        const { photocard_id, collection_name } = req.body;

        const photocard = await Photocard.findById(photocard_id);
        if (!photocard) {
            return res.status(404).json({ error: 'Photocard not found.' });
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (!collection_name) {
            return res.status(400).json({ error: 'Collection name is required.' });
        }

        

        const collection = new Collection({
            owner_id: req.user.id,
            photocard_id: photocard_id,
            collection_name
        });

        await collection.save();
        res.status(201).json({ message: 'Photocard added to collection successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding photocard to collection', details: error.message });
    }
});


router.post('/get-collection-by-name', authMiddleware, async (req, res) => {
    try {
        const { collection_name } = req.body;
        if (!collection_name) {
            return res.status(400).json({ error: 'Collection name is required.' });
        }



        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const collection = await Collection.find({ owner_id: user._id, collection_name })
            .populate('photocard_id');
            
        if (!collection || collection.length === 0) {
            return res.status(404).json({ error: 'Collection not found for the user.' });
        }

        res.status(200).json({ collection });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching collection', details: error.message });
    }
});

router.get('/get-my-collection', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const collection = await Collection.find({ owner_id: user._id, collection_name: 'My Collection' })
            .populate('photocard_id');  // Populate photocard details

        if (!collection || collection.length === 0) {
            return res.status(404).json({ error: 'No photocards found in My Collection.' });
        }

        res.status(200).json({ collection });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching collection', details: error.message });
    }
});

router.delete('/delete-photocard-from-collection', authMiddleware, async (req, res) => {
    try {
        const { photocard_id, collection_name } = req.body;
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        
        const collection = await Collection.findOne({
            owner_id: req.user.id, 
            collection_name, 
            photocard_id
        });

        if (!collection) {
            return res.status(404).json({ error: 'Photocard not found in the collection.' });
        }

        
        await Collection.findOneAndDelete({
            owner_id: req.user.id, 
            collection_name, 
            photocard_id
        });

        res.status(200).json({ message: 'Photocard removed from collection successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error removing photocard from collection', details: error.message });
    }
});


router.delete('/delete-collection', authMiddleware, async (req, res) => {
    try {
        const { collection_name } = req.body;

        // Find user by ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const collections = await Collection.deleteMany({ owner_id: user._id, collection_name });
        if (collections.deletedCount === 0) {
            return res.status(404).json({ error: 'Collection not found.' });
        }

        res.status(200).json({ message: 'Collection removed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error removing collection', details: error.message });
    }
});

router.post('/search-photocard', async (req, res) => {
    try {
        const { artist_name } = req.body;
        if (!artist_name) {
            return res.status(400).json({ error: 'Artist name is required.' });
        }

        const photocards = await Photocard.find({ artist_name });
        if (!photocards || photocards.length === 0) {
            return res.status(404).json({ error: 'Photocard not found.' });
        }

        res.status(200).json({ photocards });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching photocard', details: error.message });
    }
});



module.exports = router;