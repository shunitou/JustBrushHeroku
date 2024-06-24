// routes/upload.js
const express = require('express');
const multer = require('multer');
const pool = require('../database');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/../views/upload.html');
});

router.post('/upload', upload.single('image'), async (req, res) => {
  const userId = req.query.userId;
  const filename = req.file.filename;

  try {
    await pool.query('INSERT INTO images (user_id, filename) VALUES ($1, $2)', [userId, filename]);
    res.send('Image uploaded successfully!');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
