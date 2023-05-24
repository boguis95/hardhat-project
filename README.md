# Token Design
- initial supply (nbre de token initial)
- capped / max supply (nbr de token maximal)
- minting strategy (comment et à quel moment les qaunatité de mint st définis)
- block reward (récompense des mineurs -> staking )
- burnable



# Erreurs
- TypeError: Derived contract must override function "_mint". Two or more base classes define function with same name and parameter types.
     -> nous devons overider le _mint du parent le plus proche pour pouvoir l'utiliser -> car il est déclaré dans plusieurs parents( ERC20, ERC20Capped)
     -> se referer au code (Token.sol)

-git config --global core.autocrlf false         


# Tests 
- Voici quelques exemples de tests possibles pour le contrat Token fournis par chatGPT :

- Test de déploiement du contrat Token: vérifier que le contrat est correctement déployé sur la chaîne de blocs et qu'il possède les fonctionnalités attendues (création de jetons, transfert de jetons, récompense de mineurs, etc.).

- Test de gestion du plafond de jetons: vérifier que le plafond de jetons est correctement défini et appliqué, et que les transactions qui dépasseraient ce plafond sont rejetées.

- Test de gestion des droits d'administration: vérifier que seuls les comptes autorisés ont accès aux fonctionnalités d'administration du contrat (modification de la récompense de mineurs, destruction du contrat, etc.).

- Test de vérification de la récompense de mineurs: vérifier que la récompense de mineurs est correctement octroyée et enregistrée lors des transferts de jetons.

- Test de destruction du contrat: vérifier que le contrat peut être correctement détruit par son propriétaire et que les jetons restants sont correctement libérés.     



# Notes:
- unchecked{} -> est utilisé pour éviter les erreurs de code liés à des operations arithmétiques incorrect
-             -> NB: à utilser pour tout operation arithmétique à l'interieur des méthodes.

- la fonction receive() ->  est utilisé pour envoyer de l'argent sur le contrat intelligent
-    Ex: pour des donts  de  charité -> tous l'argent est envoyé sur une seule adresse ( du contrat)

- payable -> utilisé pour une adresse qui peut recevoir des ethers ou une fonction gerant des ethers ou qui utilise une adresse payable
-         -> owner, receive(), deposit() etc..
-         -> pour les fonctions -> on pourra alors acceder à  msg.value

- selfdestruct() -> permet de détruire le contrat en cas de besoins
-                -> prend en argument une adresse sur le quel on veut envoyer les ethers restants
-                ->        dans le constrat que l'on veut détruire (meme si ici nous avons affaire à des tokens)

- npx hardhat run scipts/deploy.js --network localhost : déploiement sur le blockchain de test de hardhat

- INFURA -> passerelle qui permet d'interagir avec un noeud etherum distant


# sites interessants
- https://ethereum.stackexchange.com/questions/113221/what-is-the-purpose-of-unchecked-in-solidity