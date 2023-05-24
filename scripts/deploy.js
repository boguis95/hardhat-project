const hre = require("hardhat");


let Token;
let TokenDeployed;

/*const getDeployedToken = async () => {
  Token = await hre.ethers.getContractFactory("Token");
  TokenDeployed = await Token.deploy(10000000, 20, "0xD330b1066A6c2396bE226258E712b5C1C005D696");
  return TokenDeployed;
}*/

async function main() {

  Token = await hre.ethers.getContractFactory("Token");

  TokenDeployed = await Token.deploy(10000000, 20, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

  await TokenDeployed.deployed();


  console.log("address du owner : ", await TokenDeployed.owner());

  console.log("address du contrat : ", TokenDeployed.address);

  return TokenDeployed;
}

const contractDeployed = main().then(r => {
  return r
}).catch((er) => {
  console.error(er);
  process.exitCode = 1;
});


module.exports = { contractDeployed };