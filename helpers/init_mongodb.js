const mongoose = require('mongoose')
require('dotenv').config();
// Initialize MongoDB connection

mongoose.connect(process.env.MONGODB_URI,{dbName: process.env.DB_NAME})
  .then(() => {
    console.log('mongodb connected')
  })
  .catch((err) =>console.log(err.message));