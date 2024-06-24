// routes/withdraw.js
const express = require('express');
const pool = require('../database');
const { sendTransaction } = require('../helpers/polygon-helper');

const router = express.Router();

router.get('/withdraw', (req, res) => {
  res.sendFile(__dirname + '/../views/withdraw.html');
});

router.post('/withdraw', async (req, res) => {
  const userId = req.query.userId;
  const walletAddress = req.body.walletAddress;
  const amount = req.body.amount;

  const userPoints = await getUserPoints(userId);

  if (userPoints >= amount) {
    try {
      const withdrawalResult = await performWithdrawal(userId, walletAddress, amount);

      if (withdrawalResult.success) {
        res.send(`Withdrawal successful. Transaction hash: ${withdrawalResult.txHash}`);
      } else {
        res.status(500).send('Withdrawal failed');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(400).send('Insufficient JustBrush Points');
  }
});

async function getUserPoints(userId) {
  // Implement logic to retrieve JustBrush Points for the user from the database
  // Return the points or handle the logic based on your application structure
  // ...

  // For example, return a static value for demonstration
  return 100; // Replace with your actual logic
}

async function performWithdrawal(userId, walletAddress, amount) {
  try {
    const txHash = await sendTransaction({
      from: '<YOUR_OWNER_ADDRESS>',
      to: '<SMART_CONTRACT_ADDRESS>',
      data: '<ENCODED_DATA_FOR_WITHDRAWAL_FUNCTION>',
    });

    // Update the database or perform any necessary actions
    // ...

    return { success: true, txHash };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

module.exports = router;
