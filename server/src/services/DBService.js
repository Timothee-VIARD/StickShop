import mysql from 'mysql2';
import {logError, logSuccess} from '../errors/DisplayError.js';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
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
