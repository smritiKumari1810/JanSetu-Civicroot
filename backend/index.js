const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const complaintRoutes = require('./routes/complaints');
const intelligenceRoutes = require('./routes/intelligence');
const uploadRoutes = require('./routes/upload');

app.use('/api/complaints', complaintRoutes);
app.use('/api/intelligence', intelligenceRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jansetu';

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected to JanSetu database'))
    .catch(err => console.log('MongoDB connection notice:', err.message));
}

app.get('/', (req, res) => {
  res.json({ message: 'JanSetu + CivicRoot API is running.' });
});

// GET /health - Dedicated Health Check Route for Render and Uptime Monitors
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'healthy',
    service: 'JanSetu + CivicRoot API',
    uptime: `${Math.floor(process.uptime())}s`,
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
