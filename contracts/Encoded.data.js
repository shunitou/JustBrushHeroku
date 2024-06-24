const ethers = require('ethers');

// Replace with your actual contract ABI and address
const contractABI = [...];  // ABI for your WithdrawalContract
const contractAddress = '0x...';  // Address of your deployed contract

// Connect to the contract using ethers
const contract = new ethers.Contract(contractAddress, contractABI);

// Encode the function and its parameters
const withdrawFunction = contract.interface.encodeFunctionData('withdrawPoints', [walletAddress, amount]);

console.log(withdrawFunction);