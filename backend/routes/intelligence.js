const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { analyzeComplaintsWithAI } = require('../services/aiService');

// GET: AI-detected hotspots & preventive intelligence
router.get('/hotspots', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    const hotspots = await analyzeComplaintsWithAI(complaints);
    res.status(200).json({
      success: true,
      totalComplaintsAnalyzed: complaints.length,
      hotspots
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate intelligence', details: err.message });
  }
});

// GET: Summary statistics for municipal leadership
router.get('/stats', async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const resolved = await Complaint.countDocuments({ status: 'Resolved' });
    const inProgress = await Complaint.countDocuments({ status: 'In Progress' });
    const pending = await Complaint.countDocuments({ status: 'Pending' });

    res.status(200).json({
      totalComplaints: total,
      resolvedComplaints: resolved,
      inProgressComplaints: inProgress,
      pendingComplaints: pending,
      resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch statistics', details: err.message });
  }
});

module.exports = router;
