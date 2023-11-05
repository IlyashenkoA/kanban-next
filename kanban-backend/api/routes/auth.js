const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtMiddleware = require('./jwtMiddleware');
const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// User registration route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for the existence of a user with the same email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const user = new User({ email, password: hashedPassword });

    // Save the user to the database
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '24h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route to redirect user if logged in
router.get('/login', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const tokenParts = authHeader.split(' ');

    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
      const token = tokenParts[1];

      jwt.verify(token, process.env.SECRET_KEY, err => {
        if (!err) {
          return res.status(200).json({ redirect: true });
        }
      });
    }
  } else {
    return res.status(200).json({ redirect: false });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // If the passwords match, create a JWT token for the user
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '24h',
      });

      res.json({ token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
