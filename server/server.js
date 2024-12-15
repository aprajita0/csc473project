const dotenv = require('dotenv');
dotenv.config();
console.log("NODE_ENV:", process.env.NODE_ENV);

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/upload');
const messageRoutes = require('./routes/messageRoutes');
const commentRoutes = require('./routes/commentRoutes');
const path = require('path');

const app = express();
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/uploads', uploadRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, "../frontend/dist"); // Adjust this path to point to the correct location of frontend/dist
  console.log(`Serving static files from: ${distPath}`); // Log the path to ensure it's correct
  app.use(express.static(distPath)); // Serve static files from dist folder

  app.get('*', (req, res) => {
    console.log('Redirecting to index.html'); // Debug redirect
    res.sendFile(path.resolve(distPath, "index.html")); // Serve the index.html from the correct path
  });
} else {
  app.get('/', (req, res) => {
    res.send('API running');
  });
}


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });

