require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  //tous les réseaux etherum avec les quels nous voulons interagir doivent etre renseigné ici
  networks: {
    goerli: {
      url: process.env.INFURA_TESTNET_ENDPOIND,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
