// WithdrawalContract.sol

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract WithdrawalContract {
    address public owner;
    ERC20 public justBrushToken;

    constructor(address _tokenAddress) {
        owner = msg.sender;
        justBrushToken = ERC20(_tokenAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function withdrawPoints(address _to, uint256 _amount) external onlyOwner {
        // Transfer custom tokens to the specified wallet address
        justBrushToken.transfer(_to, _amount);
    }
}
