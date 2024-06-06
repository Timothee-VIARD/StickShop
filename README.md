# StickShop

StickShop est une plateforme de vente en ligne de bâtons, offrant une sélection diversifiée de produits provenant de forêts du monde entier. Que vous soyez un amateur de randonnée ou simplement à la recherche d'un accessoire unique, StickShop a le bâton parfait pour vous.

## Fonctionnalités principales

- **Authentification utilisateur**: Les utilisateurs peuvent créer un compte, se connecter et gérer leur profil.
- **Boutique en ligne**: Parcourez une variété de bâtons disponibles à l'achat, avec des filtres de catégorie et de prix pour une navigation aisée.
- **Commande facile**: Ajoutez des bâtons à votre panier, passez une commande et suivez son statut jusqu'à la livraison.
- **Gestion des commandes**: Les administrateurs peuvent surveiller les commandes, gérer les produits et les utilisateurs.
- **Contact**: Vous avez des questions ? Utilisez le formulaire de contact pour joindre l'administrateur.



# Installation depuis le code source

## Prérequis
Assurez-vous d'avoir Docker Desktop installé sur votre machine. Vous pouvez le télécharger depuis le lien suivant :
[Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Instructions d'utilisation
1. Clonez le dépôt StickShop sur votre machine :

- ```git clone https://github.com/Timothee-VIARD/Stickland-site```

2. Accédez au répertoire StickShop :

- ```cd StickShop```

3. Construisez les conteneurs Docker en exécutant les commandes suivantes :

- ```docker build . --target client --tag stickshop-client```
- ```docker build . --target server --tag stickshop-server```

4. Démarrez les conteneurs Docker un par un en exécutant les commandes suivantes (bien attendre que db soit up avant de lancer server) :

- ```docker-compose up db```
- ```docker-compose up server```
- ```docker-compose up client```

Une fois les conteneurs démarrés, ouvrez votre navigateur et accédez à l'adresse http://localhost:3000 pour accéder à l'interface client.
Pour accéder à la documentation Swagger, accédez à l'adresse http://localhost:3001/api-docs.
