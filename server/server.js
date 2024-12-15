const dotenv = require('dotenv');
const result = dotenv.config();
const uri = process.env.MONGO_URI;
const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/upload');
const messageRoutes = require('./routes/messageRoutes');
const commentRoutes = require('./routes/commentRoutes');
const app = express();

<<<<<<< HEAD
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

=======
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
>>>>>>> b11bf46c31ae4a716d324d2916400092535948a8

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/users', messageRoutes);
app.use('/api/users', commentRoutes);
app.use('/api', uploadRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
  })
  
const _port = 5000;
app.listen(_port, () => {
    console.log(`Server is running on port ${_port}`);
  })

mongoose.connect(uri)
  .then(() => {
      console.log('Connected to MongoDB');
  })
  .catch((error) => {
      console.log(error);
  });
