import mysql from 'mysql2';
import { logError, logSuccess } from '../errors/DisplayError.js';

const connection = mysql.createConnection({
  host: 'mariadb',
  user: 'root',
  password: 'root',
  database: 'stickShop'
});
connection.connect((err) => {
  if (err) {
    logError('Erreur de connexion à MySQL :', err);
    process.exit(1);
  } else {
    logSuccess('Connexion à MySQL réussie !');
  }
});

export default connection;
