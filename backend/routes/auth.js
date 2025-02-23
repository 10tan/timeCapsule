const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save User
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save(); // save the returned user.

        // Generate JWT Token
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send a single response with success message, token, and user data
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message}); //send back an object.
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find User
        const user = await User.findOne({ username: username });
        if (!user) return res.status(400).json("User not found");

        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json("Invalid credentials");

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json(error.message);
    }
});
/*router.post('/logout', async (req,res) => {
    try{
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
});*/

module.exports = router;
