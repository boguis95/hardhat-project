const { expect } = require('chai');
const { ethers } = require('hardhat');
const hre = require('hardhat');

describe('Token contract test', () => {

  let Token;
  let TokenDeployed;
  let owner;
  let addr1;
  let addr2;
  const maxSupply = 2000000;
  const blockReward = 50;

  beforeEach(async () => {
    Token = await hre.ethers.getContractFactory("Token");
    [owner, addr1, addr2] = await hre.ethers.getSigners();
    TokenDeployed = await Token.deploy(maxSupply, blockReward);
    //console.log(TokenDeployed);

    await TokenDeployed.deployed(maxSupply, blockReward);

    console.log("address du contrat déployé : ", TokenDeployed.address);
  })


  //s'assurer que l'état des choses est correct après le déploiement -> que les données sont correctes
  describe('Deployement Tests', () => {

    //verifie que l'addresse test fourni par hardhad qui a déployé le contrat est bien le owner
    //il s'agit de la  premiere addresses sur la liste des addresses de test
    it("should set the right owner", async () => {
      expect(await TokenDeployed.owner()).to.equal(owner.address);
    });

    //verifie que le totalSupply a été bien transferer au owner -> que la balance du owner est égal au totalSupply
    it("should assign the total Supply of tokens to the owner", async () => {
      const ownerBalance = await TokenDeployed.balanceOf(owner.address);
      const totalSupply = await TokenDeployed.totalSupply();
      expect(totalSupply).to.equal(ownerBalance);
    });

    //verifie que le maxSupply retourné par le contrat grace à la fonction dédiée de ERC20Capped est égal à la valeur fourni en argument lors du déploiement
    it("should set the max capped suppy to the argument provided during deployement", async () => {

      const maxCappedSupplyValue = await TokenDeployed.cap();
      //Nous dormatons la valeur qui à la base est un BigNumber en type Number compréhensible par le console
      expect(Number(hre.ethers.utils.formatEther(maxCappedSupplyValue))).to.equal(maxSupply);
    });


    //verifie que le blockReward retourné par le contrat  est égal à la valeur fourni en argument lors du déploiement
    it("should set block reward to the argument provided during deployement", async () => {

      const reawrd = await TokenDeployed.blockReward();
      //Nous dormatons la valeur qui à la base est un BigNumber en type Number compréhensible par le console
      expect(Number(hre.ethers.utils.formatEther(reawrd))).to.equal(blockReward);
    });

    describe('Transaction Tests', () => {
      //verifie les transferts de tokens entre compte differents
      it("should transfer tokens between accounts", async () => {

        //premiere maniere de faire 
        await TokenDeployed.transfer(addr1.address, 50);
        const addr1Balance = await TokenDeployed.balanceOf(addr1.address);

        expect(addr1Balance).to.equal(50);


        //deuxieme maniere de faire
        const myTransaction = await TokenDeployed.connect(addr1).transfer(addr2.address, 30);

        expect(myTransaction).to.changeTokenBalances(TokenDeployed, [addr1, addr2], [-30, 30]);
      });

      it("should fail if sender doesn't have enough token", async () => {

        const initialOwnerBalance = await TokenDeployed.balanceOf(owner.address);

        const transact = TokenDeployed.connect(addr1).transfer(addr2.address, 1);

        await expect(transact).to.be.revertedWith("ERC20: transfer amount exceeds balance");

        const OwnerBalanceAfterTransact = await TokenDeployed.balanceOf(owner.address);

        //verifie que la balance initiale et la balance final du owner sont les memes
        expect(OwnerBalanceAfterTransact).to.equal(initialOwnerBalance);
      });

      it("should update balances after transfert", async () => {

        const initialOwnerBalance = await TokenDeployed.balanceOf(owner.address);

        //tranfert de 100 tokens de l'owner au addr1
        await TokenDeployed.transfer(addr1.address, 100);

        //transfert de 50 tokens de l'owner au addr2
        await TokenDeployed.transfer(addr2.address, 50);

        const finalOwnerBalance = await TokenDeployed.balanceOf(owner.address);
        //on verifie que la balance du owner a diminué de 150 apres les deux transfert
        expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(100 + 50));

        //on verifie que la balance de addr1 est de 100
        const addr1Balance = await TokenDeployed.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(100);

        //on verifie que la balance de addr2 est de 50
        const addr2Balance = await TokenDeployed.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(50);
      })
    })
  })

})