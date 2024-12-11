const dotenv = require('dotenv');
const result = dotenv.config();
const uri = process.env.MONGO_URI;
const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/upload');
const messageRoutes = require('./routes/messageRoutes');
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/users', messageRoutes);
app.use('/api', uploadRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
  })
  
<<<<<<< HEAD
app.listen(4000, () => {
    console.log('Server is running on port 4000');
=======
const _port = 5000;
app.listen(_port, () => {
    console.log(`Server is running on port ${_port}`);
>>>>>>> 1b9c36300a14a294e6cb64951f102f7fbf9ef1d2
  })

mongoose.connect(uri)
  .then(() => {
      console.log('Connected to MongoDB');
  })
  .catch((error) => {
      console.log(error);
  });