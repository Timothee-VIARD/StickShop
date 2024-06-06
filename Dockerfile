# Dockerfile pour le client
FROM node:20-slim as client

# Définir le répertoire de travail dans le conteneur Docker
WORKDIR /usr/src/app

# Copier package.json et package-lock.json
COPY client/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY client/. .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD [ "npm", "start" ]

# Dockerfile pour le serveur
FROM node:20-slim as server

# Définir le répertoire de travail dans le conteneur Docker
WORKDIR /usr/src/app

# Copier package.json et package-lock.json
COPY server/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY server/. .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3001

# Définir la commande pour démarrer l'application
CMD [ "npm", "start" ]
