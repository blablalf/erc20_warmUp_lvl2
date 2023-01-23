var ExerciceSolution = artifacts.require("ExerciceSolution.sol");
var Evaluator = artifacts.require("Evaluator.sol");
var TDToken = artifacts.require("ERC20TD.sol");
var ClaimableToken = artifacts.require("ERC20Claimable.sol");

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        // Deploy ExerciceSolution
        ExerciceSolution = await ExerciceSolution.new("0xE70AE39bDaB3c3Df5225E03032D31301E2E71B6b");
        // Log recap
        await deployRecap(deployer, network, accounts);
        
        // Submit ExerciceSolution to Evaluator
        Evaluator = await Evaluator.at("0x16F3F705825294A55d40D3D34BAF9F91722d6143");
        await Evaluator.submitExercice(ExerciceSolution.address);
        TDToken = await TDToken.at("0xb79a94500EE323f15d76fF963CcE27cA3C9e32DF");
        myBalance = await TDToken.balanceOf(accounts[0]);
	    console.log("My balance exercice submitted " + myBalance);
        
        // Claim points exercice 1
        await Evaluator.ex1_claimedPoints();
        myBalance = await TDToken.balanceOf(accounts[0]);
	    console.log("My balance exercice 1 " + myBalance);

        // Exercice 2
        await Evaluator.ex2_claimedFromContract();
        myBalance = await TDToken.balanceOf(accounts[0]);
	    console.log("My balance exercice 2 " + myBalance);

        // Exercice 3
        await Evaluator.ex3_withdrawFromContract();
        myBalance = await TDToken.balanceOf(accounts[0]);
	    console.log("My balance exercice 3 " + myBalance);

        // Exercice 4
        ClaimableToken = await ClaimableToken.at("0xE70AE39bDaB3c3Df5225E03032D31301E2E71B6b");
        await ClaimableToken.approve(ExerciceSolution.address, myBalance);
        await Evaluator.ex4_approvedExerciceSolution();
        myBalance = await TDToken.balanceOf(accounts[0])
	    console.log("My balance exercice 4 " + myBalance);

        // Exercice 5 
        await ClaimableToken.approve(ExerciceSolution.address, 0);
        await Evaluator.ex5_revokedExerciceSolution();
        myBalance = await TDToken.balanceOf(accounts[0])
	    console.log("My balance exercice 5 " + myBalance);

        // Exercice 6
        await Evaluator.ex6_depositTokens();
        myBalance = await TDToken.balanceOf(accounts[0])
	    console.log("My balance exercice 6 " + myBalance);
    });
};

async function deployRecap(deployer, network, accounts) {
    console.log("ExercicSolution " + ExerciceSolution.address);
}