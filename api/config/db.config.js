const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/veggie-mad';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to database!'))
  .catch((error) => console.error('An error ocurred trying to connect to database', error));