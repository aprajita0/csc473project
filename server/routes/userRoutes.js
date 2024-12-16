const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/Users');
const Photocard = require('../models/Photocard');
const Collection = require('../models/Collection');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');

//allow cross-origin requests
router.use(cors());

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://csc473project.vercel.app/auth/google/callback'
);

router.post('/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({
        email,
        googleId,
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      token: jwtToken, 
      user: { 
        id: user._id, 
        email: user.email, 
        username: user.username 
      } 
    });

  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(400).json({ error: 'Google authentication failed' });
  }
});

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
  const { username, password, email } = req.body;

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
    const photocards = await Photocard.find().populate('owner_id', 'username profile_pic'); 
    console.log('Photocards fetched:', photocards);

    res.status(200).json({ photocards });
  } catch (error) {
    console.error('Error fetching photocards:', error);
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

router.post('/search-photocard-artist-name', async (req, res) => {
  try {
    const { artist_name } = req.body;
    if (!artist_name) {
      return res.status(400).json({ error: 'Artist name is required.' });
    }

    const photocards = await Photocard.find({ artist_name: { $regex: new RegExp(artist_name, 'i') } });
    if (!photocards || photocards.length === 0) {
      return res.status(404).json({ error: 'Photocard not found.' });
    }

    res.status(200).json({ photocards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error searching photocard', details: error.message });
  }
});


router.get('/get-collection-names', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const collections = await Collection.find({ owner_id: user._id }).distinct('collection_name');
    if (!collections || collections.length === 0) {
      return res.status(404).json({ error: 'No collections found for the user.' });
    }

    res.status(200).json({ collections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching collection names', details: error.message });
  }
});

router.post('/search-photocard-group', async (req, res) => {
  try {
    const { group } = req.body;
    if (!group) {
      return res.status(400).json({ error: 'Group is required.' });
    }

    const photocards = await Photocard.find({ group: { $regex: new RegExp(group, 'i') } });

    if (!photocards || photocards.length === 0) {
      return res.status(404).json({ error: 'Photocard not available for the group.' });
    }

    res.status(200).json({ photocards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error searching photocard', details: error.message });
  }
});

router.post('/search-photocard-price-range', async (req, res) => {
  try {
    const { price_from, price_to } = req.body;
    if (price_from === undefined || price_to === undefined) {
      return res.status(400).json({ error: 'Both price_from and price_to are required.' });
    }
    const photocards = await Photocard.find({
      cost: { $gte: price_from, $lte: price_to }
    });

    if (!photocards || photocards.length === 0) {
      return res.status(404).json({ error: 'No photocards found in this price range.' });
    }

    res.status(200).json({ photocards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error searching photocard by price range', details: error.message });
  }
});

router.post('/search-photocard-type', async (req, res) => {
  try {
    const { type } = req.body;
    if (!type) {
      return res.status(400).json({ error: 'Type is required.' });
    }

    if (type !== 'buying' && type !== 'selling') {
      return res.status(400).json({ error: 'Invalid type. Must be either buying or selling.' });
    }

    const photocards = await Photocard.find({ type });
    if (!photocards || photocards.length === 0) {
      return res.status(404).json({ error: `No photocards found for ${type}.` });
    }

    res.status(200).json({ photocards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error searching photocard by type', details: error.message });
  }
});

router.post('/get-collection-by-username', authMiddleware, async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const otherUser = await User.findOne({ username });
    if (!otherUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const collection = await Collection.find({ owner_id: otherUser._id })
      .populate('photocard_id');

    if (!collection || collection.length === 0) {
      return res.status(404).json({ error: 'No collections found for the user.' });
    }

    res.status(200).json({ collection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching collection', details: error.message });
  }
});

router.get('/get-photocards', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const photocards = await Photocard.find({ owner_id: user._id });
    if (!photocards || photocards.length === 0) {
      return res.status(404).json({ error: 'No photocards found for the user.' });
    }

    res.status(200).json({ photocards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching photocards', details: error.message });
  }
});

router.get('/get-photocard-info/:id', async (req, res) => {
  console.log(`Fetching photocard with ID: ${req.params.id}`);
  try {
    const photocard = await Photocard.findById(req.params.id).populate('owner_id', 'username profile_pic'); 
    if (!photocard) {
      return res.status(404).json({ error: 'Photocard not found.' });
    }
    res.status(200).json(photocard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching photocard', details: error.message });
  }
});

module.exports = router;