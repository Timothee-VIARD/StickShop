const express = require('express');
const cors = require('cors'); // Importez le module cors
const app = express();
const mysql = require('mysql2');
const multer = require('multer');
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'stickShop',
});
connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
  } else {
    console.log('Connexion à MySQL réussie !');
  }
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error('Erreur lors de la requête SELECT :', error);
      res.status(500).json({error: 'Erreur serveur requête SELECT.'});
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/products/:id', (req, res) => {
  const sticksId = req.params.id;
  connection.query('SELECT * FROM products WHERE id = ?', [sticksId], (error, results) => {
    if (error) {
      console.error('Erreur lors de la requête SELECT :', error);
      res.status(500).json({error: 'Erreur serveur lors de la requête SELECT.'});
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({error: 'Aucun vêtement trouvé avec cet ID.'});
      }
    }
  });
});

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
const upload = multer({ storage: storage });

app.use('/images', express.static('images'));
app.use(express.json());

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    let imageUrl;
    if (req.file) {
      imageUrl = `http://localhost:3001/images/${req.file.filename}`;
    }

    const productId = req.body.productId;
    const { name, price, description, category, quantity, inStock } = req.body;

    let updateProductQuery;
    let queryValues;

    if (imageUrl) {
      updateProductQuery = 'UPDATE products SET name = ?, price = ?, description = ?, category = ?, quantity = ?, inStock = ?, image = ? WHERE id = ?';
      queryValues = [name, price, description, category, quantity, inStock, imageUrl, productId];
    } else {
      updateProductQuery = 'UPDATE products SET name = ?, price = ?, description = ?, category = ?, quantity = ?, inStock = ? WHERE id = ?';
      queryValues = [name, price, description, category, quantity, inStock, productId];
    }

    connection.query(updateProductQuery, queryValues, (error, results) => {
      if (error) {
        console.error('Erreur lors de la mise à jour du produit dans MySQL :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du produit.' });
      } else {
        res.status(200).json({ imageUrl: imageUrl });
      }
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit dans MySQL :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du produit.' });
  }
});

module.exports = app;