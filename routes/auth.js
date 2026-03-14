const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
<<<<<<< HEAD

    // Validation
    if (!username || !email || !password) {
      return res.status(400).send({ error: 'Username, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).send({ error: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).send({
        error: existingUser.email === email ? 'Email already in use' : 'Username already taken'
      });
    }

=======
>>>>>>> ca640d3ba53d0070f4220561d0d626d7b3cb0492
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (e) {
<<<<<<< HEAD
    console.error('Signup error:', e);
    res.status(400).send({ error: 'Signup failed. Please try again.' });
=======
    res.status(400).send(e);
>>>>>>> ca640d3ba53d0070f4220561d0d626d7b3cb0492
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
<<<<<<< HEAD

    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    // update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (e) {
    console.error('Login error:', e);
    res.status(400).send({ error: 'Login failed. Please try again.' });
=======
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
>>>>>>> ca640d3ba53d0070f4220561d0d626d7b3cb0492
  }
});

module.exports = router;