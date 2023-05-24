const app = require('./utils/setup');

const { address, walletkey, } = require('./utils/evm');
const { contractDeployed } = require('../scripts/deploy')
const hre = require('hardhat');
const { ethers } = require('hardhat');
const contractAdress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = require('../artifacts/contracts/Token.sol/Token.json').abi



app.get('/', (req, res) =>
    res.send({
        Privatekey: walletkey(),
        message: 'etherum wallet address :' + address(),
        // availableNetworks: availableNetworks()
    })
);

// const owner = async () => {
//     // const result = await provider().getBalance(address());
//     //return ethers.utils.formatEther(result);
//     const result = await main().owner();
//     return result;
// }

//const contract = new ethers.Contract(contractAdress, abi);

app.route('/adress')
    .get(async (req, res) => {
        try {
            const value = await contractDeployed.owner();
            res.status(200).json({
                address: value
            })

        } catch (e) {
            const error = e.toString();
            res.status(400).json({
                error
            })
        }
    })