const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// POST: Submit a new complaint
router.post('/', async (req, res) => {
  try {
    const { title, category, description, location, userId } = req.body;
    if (!title || !category || !description || !location) {
      return res.status(400).json({ error: 'All fields (title, category, description, location) are required.' });
    }
    const newComplaint = new Complaint({
      title,
      category,
      description,
      location,
      userId: userId || 'citizen-123'
    });
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit complaint', details: err.message });
  }
});

// GET: Fetch complaints for a specific citizen
router.get('/:userId', async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints', details: err.message });
  }
});

// DELETE: Clear all complaints (Reset Database for Testing/Production Preparation)
router.delete('/admin/clear-all', async (req, res) => {
  try {
    const result = await Complaint.deleteMany({});
    res.status(200).json({ 
      success: true, 
      message: `Database cleared. Removed ${result.deletedCount} complaint records.` 
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear database', details: err.message });
  }
});

module.exports = router;
