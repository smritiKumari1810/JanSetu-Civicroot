const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });
const Complaint = require('../models/Complaint');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jansetu';

async function clearDatabase() {
  try {
    console.log('Connecting to MongoDB at:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    const result = await Complaint.deleteMany({});
    console.log(`✓ Success: Cleared ${result.deletedCount} complaint records from the database.`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error clearing database:', err.message);
    process.exit(1);
  }
}

clearDatabase();
