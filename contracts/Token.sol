// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

//decimals() -> renvois 18 -> 10 ** 18 -> base décimal d'un Token
//ERC20capped herite dèja de ERC20 -> permet de définir le nombre de token maximal(plafond) que l'on va créer

contract Token is ERC20Burnable, ERC20Capped {
    //payable pour pouvoir appeler selfdestruct() avec l'adresse du owner
    // selfdestruct() -> permet de détruire le contrat en cas de besoins
    //               -> prend en argument une adresse sur le quel on veut envoyer les ethers restants
    //               -> dans le constrat que l'on veut détruire (meme si ici nous avons affaire à des tokens)
    address payable public owner;
    uint256 public blockReward;

    constructor(uint256 cap, uint256 _reward, address _owner)
        ERC20("BoguisLaye", "BGL")
        ERC20Capped(cap * (10**decimals()))
    {
        // payable(msg.sender) -> parceque owner est payable
        owner = payable(_owner);
        _mint(_owner, 1000000 * (10**decimals()));
        blockReward = _reward * (10**decimals());
    }

    //nous devons overider le _mint du parent le plus proche pour pouvoir l'utiliser
    //-> car il est déclaré dans plusieurs parents( ERC20, ERC20Capped)
    //dans l'overide-> on précise tous les parents qui possede la fonction _mint()
    function _mint(address account, uint256 amount)
        internal
        virtual
        override(ERC20, ERC20Capped)
    {
        require(
            ERC20.totalSupply() + amount <= cap(),
            "ERC20Capped: cap exceeded"
        );
        //il faut appeler le mint du parent le plus proche
        super._mint(account, amount);
    }

    //permet de set un nouveau montant pour la récompense des mineurs si jamais nous voulions le changer
    function setBlockReward(uint256 _reward) public onlyOwner {
        blockReward = _reward;
    }

    // mintMinerReward() -> permet de transferer la récompense au mineur
    // block.coinbase -> adresse du mineur qui a réussi à ajouter la transaction dans un block
    function mintMinerReward() internal {
        _mint(block.coinbase, blockReward);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        //la récompense se fait pendant les transfert -> avant l'action de transfert -> quand ce dernier est imminant
        //condition à verifier avant de minter la récompense
        if (from != address(0) && to != address(0) && to != block.coinbase) {
            mintMinerReward();
        }
        //on recupere la fonction du parent qu'on a overrider -> récuperer tous les infos qu'il contient
        super._beforeTokenTransfer(from, to, amount);
    }

    //destruction du contrat si une fois c'est nécessaire
    function destroy() public onlyOwner {
        // prend en argument une adresse payable
        selfdestruct(owner);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "you can't call this function ");
        _;
    }
}
