import mysql from "mysql2";

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

export default connection;