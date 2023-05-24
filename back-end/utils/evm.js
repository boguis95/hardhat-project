const fs = require('fs');
const hre = require("hardhat");
const { ethers } = require('ethers');

// Permet la récuperation de la clé privée du wallet s'il existe déja -> sinon on crée un nouveau wallet et on lui associe une clé privé
const walletkey = () => {
    //le chemin du fichier de coonfiguration du wallet -> qui sera créer s'il n'existe pas encore
    const wPath = './utils/WalletConfig.json';
    // on récupere la clé privée si le fichier existe dèja
    if (fs.existsSync(wPath)) return require('./WalletConfig.json').privateKey;
    //o crée aléatoirement un wallet
    const wallet = ethers.Wallet.createRandom();
    //on crée une clé (clé privée -> à verifier)
    const key = wallet._signingKey();
    //on place la clé dans notre fichier de config du wallet
    fs.writeFileSync(wPath, JSON.stringify(key, undefined, 2));
    //on retourne la clé du wallet
    return wallet.privateKey;

}
// on crée l'adress du wallet (clé publique)
const address = () => new ethers.Wallet(walletkey()).address;

//on récupere la liste des réseaux disponibles
//const availableNetworks = () => Object.keys(require('./ChainConfig.json'));

// on crée notre provider(fournisseur de noeuds) de noeuds qui se chargera de communiqer avec le réseau blockchain 
//     -> on y accede grace au rpc endpoint
// const provider = (network) =>

//     new ethers.providers.JsonRpcProvider(
//         require('./ChainConfig.json')[network].rpc
//     );
// ;
// //création d'un objet relatif au sigantaire avec la clé privée   
// const signer = (network) => new ethers.Wallet(walletkey(), provider(network))


module.exports = { address, walletkey };