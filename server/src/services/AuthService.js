import bcrypt from 'bcrypt';
import connection from './DBService.js';
import jwt from 'jsonwebtoken';
import CustomError from '../errors/CustomError.js';
import { ERROR_CODES } from '../constants/errorCodes.js';

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
              [email, hash, username, 'USER'],
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
        reject(new CustomError('Email, password and username are required', ERROR_CODES.INVALID_DATA));
      }
    });
  }

  static async login(body) {
    return new Promise((resolve, reject) => {
      const { email, password } = body;
      if (email && password) {
        connection.query(
          'SELECT users.*, profile.image as profilePhoto FROM users LEFT JOIN profile ON users.id = profile.userId WHERE email = ?',
          [email],
          (error, results) => {
            if (error) {
              reject(error);
            } else if (results.length > 0) {
              const user = results[0];
              bcrypt.compare(password, user.password, (error, same) => {
                if (error) {
                  reject(error);
                } else if (same) {
                  const token = jwt.sign({ id: user.id }, 'token', {
                    expiresIn: '24h'
                  });
                  resolve({ ...user, token: token });
                } else {
                  reject(new CustomError('Invalid credentials', ERROR_CODES.INVALID_CREDENTIALS));
                }
              });
            } else {
              reject(new CustomError('Invalid credentials', ERROR_CODES.INVALID_CREDENTIALS));
            }
          }
        );
      } else {
        reject(new CustomError('Email and password are required', ERROR_CODES.INVALID_DATA));
      }
    });
  }
}

export default AuthService;
