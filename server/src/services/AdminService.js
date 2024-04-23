import connection from './DBService.js';
import multer from "multer";

class AdminService {
  static async getAllProducts() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id, name, price, quantity, description, inStock FROM products', (err, results) => {
        if (err) {
          console.error('Erreur lors de la requête SELECT :', error);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async getProductById(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            reject(new Error('Product not found'));
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  }

  static async addProduct(product) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO products (name, price, image) VALUES (?, ?, ?)', [product.name, product.price, product.image], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async deleteProduct(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async updateProduct(body, file) {
    return new Promise((resolve, reject) => {
      let imageUrl;
      if (file) {
        imageUrl = `http://localhost:3001/images/${file.filename}`;
      }

      const product = {
        id: body.productId,
        name: body.name,
        price: body.price,
        description: body.description,
        category: body.category,
        quantity: body.quantity,
        inStock: body.inStock,
        imageUrl: imageUrl
      };

      let updateProductQuery;
      let queryValues;

      if (imageUrl) {
        updateProductQuery = 'UPDATE products SET name = ?, price = ?, description = ?, category = ?, quantity = ?, inStock = ?, image = ? WHERE id = ?';
        queryValues = [product.name, product.price, product.description, product.category, product.quantity, product.inStock, imageUrl, product.id];
      } else {
        updateProductQuery = 'UPDATE products SET name = ?, price = ?, description = ?, category = ?, quantity = ?, inStock = ? WHERE id = ?';
        queryValues = [product.name, product.price, product.description, product.category, product.quantity, product.inStock, product.id];
      }

      connection.query(updateProductQuery, queryValues, (error, results) => {
        if (error) {
          console.error('Erreur lors de la mise à jour du produit dans MySQL :', error);
          reject(error);
        } else {
          resolve({imageUrl: imageUrl});
        }
      });
    });
  }

  static configureMulter() {
    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        const uploadDir = './images';
        callback(null, uploadDir);
      },
      filename: (req, file, callback) => {
        const fileName = `${file.originalname}`;
        callback(null, fileName);
      }
    });
    return multer({storage: storage});
  }
}

export default AdminService;