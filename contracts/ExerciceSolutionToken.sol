// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

import "./IERC20Mintable.sol";

contract ExerciceSolutionToken is ERC20, IERC20Mintable, ERC20Burnable, Ownable {

    mapping(address => bool) public minters;
    mapping(address => bool) public burners;

    constructor() ERC20("ExerciceSolutionToken", "EST") public {
        minters[msg.sender] = true;
    }

    function mint(address to, uint256 amount) public override(IERC20Mintable) {
        require(minters[msg.sender], "Only minters can mint");
        _mint(to, amount);
        emit Transfer(address(0), to, amount);
    }

    function setMinter(address minterAddress, bool isMinter) external override(IERC20Mintable) onlyOwner {
        minters[minterAddress] = isMinter;
    }

	function isMinter(address minterAddress) external override(IERC20Mintable) returns (bool) {
        return minters[minterAddress];
    }

    function setBurner(address burnerAddress, bool isBurner) external onlyOwner {
        burners[burnerAddress] = isBurner;
    }

	function isBurner(address burnerAddress) external returns (bool) {
        return burners[burnerAddress];
    }

    function approveFrom(address owner, address spender, uint256 amount) external onlyOwner {
        _approve(owner, spender, amount);
    }

}
