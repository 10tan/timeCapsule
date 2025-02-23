const express = require('express');
const router = express.Router(); // ✅ Use Router instead of app
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.use(express.json());

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dqf7rai71',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ✅ Multer Storage (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Image Upload Route
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // ✅ Upload File to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `user_uploads/${userId}`,
          resource_type: 'auto',
          public_id: `${Date.now()}-${req.file.originalname.split('.')[0]}`,
        },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      uploadStream.end(req.file.buffer);
    });

    // ✅ Update User Schema
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { imgurl: result.secure_url },
      { new: true }
    );

    res.status(200).json({ message: 'Upload successful', imageUrl: updatedUser.imgurl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; // ✅ Export Router
