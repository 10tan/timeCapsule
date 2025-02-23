// routes/email.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const postmark = require('postmark');
const User = require('../models/user');

// Postmark setup
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

router.post('/send-email', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const response = await client.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL, // Must be a verified sender signature
      To: user.email,
      Subject: 'Countdown Timer Finished',
      TextBody: 'Your countdown timer has reached zero!',
    });

    console.log('Postmark response:', response); // Log the response

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;