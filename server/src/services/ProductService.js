import connection from './DBService.js';

class ProductService {
  static async getAllProducts() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products', (error, results) => {
        if (error) {
          console.error('Erreur lors de la requête SELECT :', error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async getProductById(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products WHERE id = ?', [id], (error, results) => {
        if (error) {
          console.error('Erreur lors de la requête SELECT :', error);
          reject({ code: 500, data: { error: 'Erreur serveur requête SELECT.' } });
        } else {
          if (results.length === 0) {
            reject({ code: 404, data: { error: 'Produit non trouvé.' } });
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  }
}

export default ProductService;
