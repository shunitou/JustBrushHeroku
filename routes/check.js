// routes/check.js
const express = require('express');
const pool = require('../database');
const pointsHelper = require('../helpers/points-helper'); // Import the points-helper

const router = express.Router();

// Function to check if the user is a special user
function checkSpecialUser(req, res, next) {
  if (req.isAuthenticated() && req.session.userRole === 'special') {
    return next();
  } else {
    res.status(403).send('Forbidden');
  }
}

router.get('/check', checkSpecialUser, async (req, res) => {
  // Assume you have some logic to retrieve normal user images based on a filter
  const images = await getImagesForSpecialUser(req.user.id, req.query.filter);

  res.render('check', { images });
});

router.post('/reward', checkSpecialUser, async (req, res) => {
  const userId = req.body.userId; // Assuming you have userId in the form data
  const rewardAmount = req.body.rewardAmount;

  try {
    // Use the rewardUserWithPoints function from the points-helper
    await pointsHelper.rewardUserWithPoints(userId, rewardAmount);

    res.redirect('/check');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Other functions and routes...

module.exports = router;
