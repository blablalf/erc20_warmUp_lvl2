pragma solidity ^0.6.0;
import "./IExerciceSolution.sol";
import "./ERC20Claimable.sol";
import "./ExerciceSolutionToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExerciceSolution is IExerciceSolution, Ownable {
    ERC20Claimable claimableERC20;
    mapping(address => uint256) public balance;
    ExerciceSolutionToken exerciceSolutionToken;

    constructor (ERC20Claimable _claimableERC20) public {
        claimableERC20 = _claimableERC20;
    }

	function claimTokensOnBehalf() external override(IExerciceSolution) {
        uint256 claimedTokens = claimableERC20.claimTokens();
        balance[msg.sender] += claimedTokens;
    }

	function tokensInCustody(address callerAddress) external override(IExerciceSolution) returns (uint256) {
        return balance[callerAddress];
    }

	function withdrawTokens(uint256 amountToWithdraw) external override(IExerciceSolution) returns (uint256) {
        require(balance[msg.sender] >= amountToWithdraw, "Amount to withdraw is greater than balance");
        claimableERC20.transfer(msg.sender, amountToWithdraw);
        balance[msg.sender] -= amountToWithdraw;
        if (address(exerciceSolutionToken) != address(0)) { // so exerciceSolutionToken is defined
            require(exerciceSolutionToken.isBurner(address(this)), "Not available to mint you EST");
            exerciceSolutionToken.burnFrom(msg.sender, amountToWithdraw);
        }
        return balance[msg.sender];
    } 

	function depositTokens(uint256 amountToDeposit) external override(IExerciceSolution) returns (uint256) {
        claimableERC20.transferFrom(msg.sender, address(this), amountToDeposit);
        balance[msg.sender] += amountToDeposit;
        if (address(exerciceSolutionToken) != address(0)) { // so exerciceSolutionToken is defined
            require(exerciceSolutionToken.isMinter(address(this)), "Not available to mint you EST");
            exerciceSolutionToken.mint(msg.sender, amountToDeposit);
        }
        return balance[msg.sender];
    }

    function setERC20DepositAddress(address _exerciceSolutionTokenAddress) external onlyOwner {
        exerciceSolutionToken = ExerciceSolutionToken(address(_exerciceSolutionTokenAddress));
    }
    
	function getERC20DepositAddress() external override(IExerciceSolution) returns (address) {
        return address(exerciceSolutionToken);
    }
}
