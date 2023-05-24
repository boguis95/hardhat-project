require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  //on précie dans quel dossier nous voulons placer notre dossier artifact pendant la compilation
  //ici on le place dans le dossier back-end pour acceder facilement à l'abi de notre contrat
  path: {
    artifacts: './back-end/artifacts'
  },
  //on précise tous les réseaux etherums avec les quels nous voulons interagir doivent etre renseigné ici
  networks: {
    goerli: {
      //endpoint rpc qui permet d'acceder à la blockchain via un noeud
      url: "https://goerli.infura.io/v3/a01057dea9864db28cb5e106ae65420a",
      //clé privé du owner
      accounts: ["0277e007b4d93fbfc40aa9a5c448082c2a4471e9c6500fef8922eb6c93f81538"
      ]
    }
  }
};
