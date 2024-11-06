const dotenv = require('dotenv');
const result = dotenv.config();
const uri = process.env.MONGO_URI;
const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World');
  })
  
app.listen(5000, () => {
    console.log('Server is running on port 5000');
  })

mongoose.connect(uri)
  .then(() => {
      console.log('Connected to MongoDB');
  })
  .catch((error) => {
      console.log(error);
  });