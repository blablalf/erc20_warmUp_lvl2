pragma solidity ^0.6.0;
import "./IExerciceSolution.sol";
import "./ERC20Claimable.sol";

contract ExerciceSolution is IExerciceSolution
{
    ERC20Claimable claimableERC20;
    mapping(address => uint256) public balance;
    event LogExample(string message);

    constructor (ERC20Claimable _claimableERC20) public {
        claimableERC20 = _claimableERC20;
    }

	function claimTokensOnBehalf() external override(IExerciceSolution) {
        uint256 claimedTokens = claimableERC20.claimTokens();
        balance[msg.sender] += claimedTokens;
    }

	function tokensInCustody(address callerAddress) external override(IExerciceSolution) returns (uint256) {
        return balance[msg.sender];
    }

	function withdrawTokens(uint256 amountToWithdraw) external override(IExerciceSolution) returns (uint256) {
        require(balance[msg.sender] >= amountToWithdraw, "Amount to withdraw is greater than balance");
        claimableERC20.transfer(msg.sender, amountToWithdraw);
        balance[msg.sender] -= amountToWithdraw;
        return balance[msg.sender];
    } 

	function depositTokens(uint256 amountToWithdraw) external override(IExerciceSolution) returns (uint256) {
        claimableERC20.transferFrom(msg.sender, address(this), amountToWithdraw);
        balance[msg.sender] += amountToWithdraw;
        return balance[msg.sender];
    }

	function getERC20DepositAddress() external override(IExerciceSolution) returns (address) {
        return address(0);
    }
}
