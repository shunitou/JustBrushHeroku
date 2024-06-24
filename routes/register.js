// routes/register.js
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../database');

const router = express.Router();

router.get('/register', (req, res) => {
  // Direct users to the appropriate registration page based on their role
  const role = req.query.role || 'normal'; // Assume 'normal' if role is not specified
  if (role === 'normal') {
    res.sendFile(__dirname + '/../views/registerNormal.html');
  } else if (role === 'special') {
    res.sendFile(__dirname + '/../views/registerSpecial.html');
  } else {
    res.status(400).send('Invalid role');
  }
});

router.post('/register', async (req, res) => {
  const { username, password, registrationCode, role } = req.body;

  // Check registration code for special user role
  const isSpecialUser = role === 'special' && registrationCode === 'specialCode';

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id', [username, hashedPassword, isSpecialUser ? 'special' : 'normal']);
    const userId = result.rows[0].id;

    res.redirect(`/upload?userId=${userId}`);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
