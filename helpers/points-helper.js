// helpers/points-helper.js
const pool = require('../database');

async function rewardUserWithPoints(userId, rewardAmount) {
  try {
    // Update the user's points in the database
    await pool.query('UPDATE users SET points = points + $1 WHERE id = $2', [rewardAmount, userId]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rewardUserWithPoints,
};
