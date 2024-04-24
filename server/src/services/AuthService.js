import bcrypt from 'bcrypt';
import connection from './DBService.js';

class AuthService {
  static async signUp(body) {
    return new Promise((resolve, reject) => {
      const { email, password, username } = body;
      if (email && password && username) {
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            reject(error);
          } else {
            connection.query(
              'INSERT INTO users (email, password, username, role) VALUES (?, ?, ?, ?)',
              [email, hash, username, 'user'],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          }
        });
      } else {
        reject(new Error('Email, password and username are required'));
      }
    });
  }

  static async login(body) {
    return new Promise((resolve, reject) => {
      const { email, password } = body;
      if (email && password) {
        connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
          if (error) {
            reject(error);
          } else if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (error, same) => {
              if (error) {
                reject(error);
              } else if (same) {
                resolve(user);
              } else {
                reject(new Error('Invalid information'));
              }
            });
          } else {
            reject(new Error('Invalid information'));
          }
        });
      } else {
        reject(new Error('Email and password are required'));
      }
    });
  }
}

export default AuthService;
