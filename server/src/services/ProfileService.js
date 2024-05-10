import connection from './DBService.js';
import CustomError from '../errors/CustomError.js';
import { ERROR_CODES } from '../constants/errorCodes.js';

class ProfileService {
  static async getProfileByUserId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM profile WHERE user_id = ?', [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            reject(new CustomError('Profile not found for the given user id', ERROR_CODES.PROFILE_NOT_FOUND));
          }
          resolve(results[0]);
        }
      });
    });
  }

  static async createProfile(profile) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO profile VALUES (NULL, ?, ?, ?, ?, ?, ?)',
        [profile.userId, profile.firstName, profile.lastName, profile.address, profile.phone, profile.image],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  static async updateProfile(profile) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM profile WHERE user_id = ?', [profile.userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            reject(new CustomError('Profile not found for the given user id', ERROR_CODES.PROFILE_NOT_FOUND));
          } else {
            connection.query(
              'UPDATE profile SET firstName = ?, lastName = ?, address = ?, phone = ?, image = ? WHERE user_id = ?',
              [profile.firstName, profile.lastName, profile.address, profile.phone, profile.image, profile.userId],
              (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(results);
                }
              }
            );
          }
        }
      });
    });
  }
}

export default ProfileService;
