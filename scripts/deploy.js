const hre = require("hardhat");

async function main() {

  const Token = await hre.ethers.getContractFactory("Token");

  const TokenDeployed = await Token.deploy(10000000, 20);

  await TokenDeployed.deployed();

  console.log("address du contrat : ", TokenDeployed.address);
}

main().catch((er) => {
  console.error(er);
  process.exitCode = 1;
});