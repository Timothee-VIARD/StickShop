import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de StickShop',
      version: '1.0.0',
      description: "Documentation de l'API pour gérer les produits, utilisateurs et commandes"
    }
  },
  apis: ['src/routes/*.js']
};

const specs = swaggerJsdoc(options);

export default specs;
