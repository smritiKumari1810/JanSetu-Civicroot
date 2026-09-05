const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadMediaBuffer } = require('../services/cloudinaryService');

// Memory storage to stream directly to Cloudinary without saving to disk
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB max file size
  }
});

// POST /api/upload/image - Upload complaint photo
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const secureUrl = await uploadMediaBuffer(req.file.buffer, {
      resource_type: 'image',
      mimeType: req.file.mimetype
    });

    res.status(200).json({
      success: true,
      url: secureUrl,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload image', details: err.message });
  }
});

// POST /api/upload/voice - Upload citizen voice recording
router.post('/voice', upload.single('voice'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const secureUrl = await uploadMediaBuffer(req.file.buffer, {
      resource_type: 'auto',
      mimeType: req.file.mimetype || 'audio/webm'
    });

    res.status(200).json({
      success: true,
      url: secureUrl,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload voice note', details: err.message });
  }
});

module.exports = router;
