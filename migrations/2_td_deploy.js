var ExerciceSolution = artifacts.require("ExerciceSolution.sol");
var ExerciceSolutionToken = artifacts.require("ExerciceSolutionToken.sol");
var Evaluator = artifacts.require("Evaluator.sol");
var TDToken = artifacts.require("ERC20TD.sol");
var ClaimableToken = artifacts.require("ERC20Claimable.sol");

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        console.log("accounts " + accounts[0]);
        // Get TDToken address in order to display balance
        TDToken = await TDToken.at("0xb79a94500EE323f15d76fF963CcE27cA3C9e32DF");
        myBalance = await TDToken.balanceOf(accounts[0]);

        /////// Exercice 1: Manual claim ///////
        ClaimableToken = await ClaimableToken.at("0xE70AE39bDaB3c3Df5225E03032D31301E2E71B6b");
        await ClaimableToken.claimTokens();

        // Instanciate Evaluator and claim Exercice 1
        Evaluator = await Evaluator.at("0x16F3F705825294A55d40D3D34BAF9F91722d6143");
        await Evaluator.ex1_claimedPoints();

        // Display balance
        myBalance = await ClaimableToken.balanceOf(accounts[0]);
        console.log("My balance exercice 1 - ex1_claimedPoints() part - " + myBalance);

        /////// Exercice 2: Claim from contract ///////
        // Deploy ExerciceSolution
        ExerciceSolution = await ExerciceSolution.new(ClaimableToken.address);
        // Submit ExerciceSolution to Evaluator
        await Evaluator.submitExercice(ExerciceSolution.address);
        // Claim points
        await Evaluator.ex2_claimedFromContract();
        // Display balance
        myBalance = await TDToken.balanceOf(accounts[0]);
        console.log("My balance exercice 2 " + myBalance);

        /////// Exercice 3: Withdraw From Contract ///////
        await Evaluator.ex3_withdrawFromContract();
        // Display balance
        myBalance = await TDToken.balanceOf(accounts[0]);
        console.log("My balance exercice 3 " + myBalance);

        /////// Exercice 4: Approved Exercice Solution ///////
        await ClaimableToken.approve(ExerciceSolution.address, myBalance);
        await Evaluator.ex4_approvedExerciceSolution();
        // Display balance
        myBalance = await TDToken.balanceOf(accounts[0])
        console.log("My balance exercice 4 " + myBalance);

        /////// Exercice 5: Revoked Exercice Solution ///////
        await ClaimableToken.approve(ExerciceSolution.address, 0);
        await Evaluator.ex5_revokedExerciceSolution();
        // Display balance
        myBalance = await TDToken.balanceOf(accounts[0])
        console.log("My balance exercice 5 " + myBalance);

        /////// Exercice 6: Deposit Tokens ///////
        await Evaluator.ex6_depositTokens();
        // Display balance
        myBalance = await TDToken.balanceOf(accounts[0])
        console.log("My balance exercice 6 " + myBalance);

        /////// Exercice 7: Create ERC20 ///////
        ExerciceSolutionToken = await ExerciceSolutionToken.new();
        await ExerciceSolution.setERC20DepositAddress(ExerciceSolutionToken.address);
        await ExerciceSolutionToken.setMinter(ExerciceSolution.address, true);
        await Evaluator.ex7_createERC20();
        // Display balance
        myBalance = await TDToken.balanceOf(accounts[0]);
        console.log("My balance exercice 7 " + myBalance);

        /////// Exercice 8: Deposit And Mint ///////
        await Evaluator.ex8_depositAndMint();
        // Display balance
        myBalance = await TDToken.balanceOf(accounts[0]);
        console.log("My balance exercice 8 " + myBalance);

        // Exercice 9
        await ExerciceSolutionToken.setBurner(ExerciceSolution.address, true);
        evaluatorBalance = await ExerciceSolutionToken.balanceOf(Evaluator.address);
        await ExerciceSolutionToken.approveFrom(Evaluator.address, ExerciceSolution.address, evaluatorBalance);
        await Evaluator.ex9_withdrawAndBurn();
        // Display balance
        myBalance = await TDToken.balanceOf(accounts[0]);
        console.log("My balance exercice 9 " + myBalance);
    
    });
};

async function deployRecap(deployer, network, accounts) {
    console.log("ExercicSolution " + ExerciceSolution.address);
}