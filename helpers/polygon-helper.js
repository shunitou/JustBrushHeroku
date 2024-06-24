// helpers/polygon-helper.js
const { ethers } = require('ethers');

async function sendTransaction({ from, to, data }) {
  const provider = new ethers.providers.JsonRpcProvider('<POLYGON_RPC_ENDPOINT>');
  const wallet = new ethers.Wallet('<PRIVATE_KEY>', provider);

  const transaction = {
    from,
    to,
    data,
  };

  const signedTransaction = await wallet.sendTransaction(transaction);
  return signedTransaction.hash;
}

module.exports = { sendTransaction };
