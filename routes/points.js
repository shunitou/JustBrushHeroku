// routes/points.js
const express = require('express');
const pool = require('../database');

const router = express.Router();

router.get('/points', async (req, res) => {
  const userId = req.user ? req.user.id : null; // Get the user ID from the authenticated user

  try {
    const result = await pool.query('SELECT points FROM images WHERE user_id = $1', [userId]);
    const userPoints = result.rows.reduce((total, row) => total + row.points, 0);

    res.json({ userPoints });
  } catch (error) {
    console.error('Error retrieving points:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
