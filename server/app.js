const express = require('express');
const cors = require('cors'); // Importez le module cors
const app = express();
const mysql = require('mysql2');
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost'
  ,
  user: 'root'
  ,
  password: 'root'
  ,
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

app.get('/:id', (req, res) => {
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

module.exports = app;