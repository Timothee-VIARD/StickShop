# StickShop

StickShop est une plateforme de vente en ligne de bâtons, offrant une sélection diversifiée de produits provenant de forêts du monde entier. Que vous soyez un amateur de randonnée ou simplement à la recherche d'un accessoire unique, StickShop a le bâton parfait pour vous.

## Fonctionnalités principales

- **Authentification utilisateur**: Les utilisateurs peuvent créer un compte, se connecter et gérer leur profil.
- **Boutique en ligne**: Parcourez une variété de bâtons disponibles à l'achat, avec des filtres de catégorie et de prix pour une navigation aisée.
- **Commande facile**: Ajoutez des bâtons à votre panier, passez une commande et suivez son statut jusqu'à la livraison.
- **Gestion des commandes**: Les administrateurs peuvent surveiller les commandes, gérer les produits et les utilisateurs.
- **Contact**: Vous avez des questions ? Utilisez le formulaire de contact pour joindre l'administrateur.

# Installation

## Prérequis
Assurez-vous d'avoir Docker Desktop installé sur votre machine. Vous pouvez le télécharger depuis le lien suivant :
[Docker Desktop](https://www.docker.com/products/docker-desktop/)

⚠️ Si vous voulez installer sans Docker, la dernière méthode le permet.

## Installation depuis Docker Hub

1. Télécharger le fichier docker-compose.yml

2. Depuis l'emplacement de docker-compose.yml, executer la commande suivante (il peut y avoir des erreurs notamment au niveau du server, qui se lance avant la base de donnée, cependant, il devrait se redémarrer plusieurs fois avant de réussir à bien se connecter) :

- ```docker-compose up```

Une fois les conteneurs démarrés, ouvrez votre navigateur et accédez à l'adresse http://localhost:3000 pour accéder à l'interface client.
Pour accéder à la documentation Swagger, accédez à l'adresse http://localhost:3001/api-docs.

⚠️ Ne pas oublier de stopper les conteneurs et de supprimer les volumes lorsque vous avez terminé les tests (depuis Docker desktop).

## Installation depuis le code source (Docker)

1. Clonez le dépôt StickShop sur votre machine :

- ```git clone https://github.com/Timothee-VIARD/Stickland-site```

2. Accédez au répertoire StickShop :

- ```cd StickShop```

3. Construisez les conteneurs Docker en exécutant les commandes suivantes :

- ```docker build . --target client --tag stickshop-client```
- ```docker build . --target server --tag stickshop-server```

4. Démarrez les conteneurs Docker un par un en exécutant les commandes suivantes :

- ```docker-compose up```

Une fois les conteneurs démarrés, ouvrez votre navigateur et accédez à l'adresse http://localhost:3000 pour accéder à l'interface client.
Pour accéder à la documentation Swagger, accédez à l'adresse http://localhost:3001/api-docs.

## Installation depuis le code source (sans Docker)

1. Clonez le dépôt StickShop sur votre machine :

- ```git clone https://github.com/Timothee-VIARD/Stickland-site```

2. Accédez au répertoire server :

- ```cd StickShop/server```

3. Executer les commandes (il faut qu'une base de données SQL tourne en arriere plan sur le port 3306, sinon le server n'arrivera pas à se connecter à la base de donnée) :

- ```npm install```
- ```npm start```

4. Accédez au répertoire client :

- ```cd StickShop/server```

5. Executer les commandes :

- ```npm install```
- ```npm start```

6. Executer les scripts SQL :

- ```create.sql``` (pour créer les tables)
- ```insert.sql``` (pour insérer des données de test)

Une fois l'application démarrée, ouvrez votre navigateur et accédez à l'adresse http://localhost:3000 pour accéder à l'interface client.
Pour accéder à la documentation Swagger, accédez à l'adresse http://localhost:3001/api-docs.
