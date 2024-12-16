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
app.use(cors({
  origin: '*', 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use((req, res, next) => {
  console.log(`${req.method} request made to: ${req.url}`);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  next();
});


app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = (body) => {
    console.log(`Response for ${req.method} ${req.url} with status: ${res.statusCode}`);
    console.log('Response body:', body);
    originalSend.call(res, body);
  };
  next();
});

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
      error: 'Unexpected server error',
      details: err.message
  });
});


app.use('/api/users', userRoutes);
app.use('/api/users', messageRoutes);
app.use('/api/users', commentRoutes);
app.use('/api', uploadRoutes);

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, "../frontend/dist");
  console.log(`Serving static files from: ${distPath}`);

  
  app.use(express.static(distPath));

  
  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) {
      return next();
    }
    console.log('Redirecting to index.html');
    res.sendFile(path.resolve(distPath, 'index.html'));
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
