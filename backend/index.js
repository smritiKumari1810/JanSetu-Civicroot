const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const complaintRoutes = require('./routes/complaints');
app.use('/api/complaints', complaintRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jansetu';

// Only connect to MongoDB if not in a test mock mode
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected to JanSetu database'))
  .catch(err => console.log('MongoDB connection error (ensure MongoDB is running or URI is set in .env):', err.message));

app.get('/', (req, res) => {
  res.json({ message: 'JanSetu + CivicRoot API is running.' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
