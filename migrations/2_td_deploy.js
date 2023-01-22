var ExerciceSolution = artifacts.require("ExerciceSolution.sol");
var Evaluator = artifacts.require("Evaluator.sol");
var TDToken = artifacts.require("ERC20TD.sol");

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        // Deploy ExerciceSolution
        await deployExerciceSolution(deployer, network, accounts);
0xb79a94500EE323f15d76fF963CcE27cA3C9e32DF
        // Submit ExerciceSolution to Evaluator
        Evaluator = await Evaluator.at("0x16F3F705825294A55d40D3D34BAF9F91722d6143");
        await Evaluator.submitExercice(ExerciceSolution.address);
        TDToken = await TDToken.at("0xb79a94500EE323f15d76fF963CcE27cA3C9e32DF");
        myBalance = await TDToken.balanceOf(accounts[0])
	    console.log("My balance exercice submitted " + myBalance);
        
        // Claim points exercice 1
        await Evaluator.ex1_claimedPoints();
        myBalance = await TDToken.balanceOf(accounts[0])
	    console.log("My balance exercice 1 " + myBalance);

        // Exercice 2
        await Evaluator.ex2_claimedFromContract();
        myBalance = await TDToken.balanceOf(accounts[0])
	    console.log("My balance exercice 2 " + myBalance);

        // Exercice 3
        await Evaluator.ex3_withdrawFromContract();
        myBalance = await TDToken.balanceOf(accounts[0])
	    console.log("My balance exercice 3 " + myBalance);

        // Log recap
        await deployRecap(deployer, network, accounts); 
    });
};

async function deployExerciceSolution(deployer, network, accounts) {
	ExerciceSolution = await ExerciceSolution.new("0xE70AE39bDaB3c3Df5225E03032D31301E2E71B6b");
}

async function deployRecap(deployer, network, accounts) {
    console.log("ExercicSolution " + ExerciceSolution.address);
}