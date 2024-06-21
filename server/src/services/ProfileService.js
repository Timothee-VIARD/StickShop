import connection from './DBService.js';
import CustomError from '../errors/CustomError.js';
import { ERROR_CODES } from '../constants/errorCodes.js';

class ProfileService {
  static async getProfileByUserId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM profile WHERE userId = ?', [id], (err, results) => {
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

  static async createProfile(data, file) {
    let imageUrl;
    if (file) {
      imageUrl = `/images/${file.filename}`;
    }
    const profile = JSON.parse(data.profile);

    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO profile VALUES (NULL, ?, ?, ?, ?, ?, ?)',
        [
          profile.userId,
          profile.firstName,
          profile.lastName,
          profile.address,
          profile.phone,
          imageUrl || profile.image
        ],
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

  static async updateProfile(data, file) {
    const profile = JSON.parse(data.profile);
    const user = JSON.parse(data.user);
    let imageUrl;
    if (file) {
      imageUrl = `/images/${file.filename}`;
    }

    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM profile WHERE userId = ?', [profile.userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            reject(new CustomError('Profile not found for the given user id', ERROR_CODES.PROFILE_NOT_FOUND));
          } else {
            connection.beginTransaction((err) => {
              if (err) {
                reject(err);
              } else {
                connection.query(
                  'UPDATE profile SET firstName = ?, lastName = ?, address = ?, phone = ?, image = ? WHERE userId = ?',
                  [
                    profile.firstName,
                    profile.lastName,
                    profile.address,
                    profile.phone,
                    imageUrl || profile.image,
                    profile.userId
                  ],
                  (err, results) => {
                    if (err) {
                      return connection.rollback(() => {
                        reject(err);
                      });
                    }

                    connection.query(
                      'UPDATE users SET username = ?, email = ? WHERE id = ?',
                      [user.username, user.email, user.id],
                      (err, results) => {
                        if (err) {
                          return connection.rollback(() => {
                            reject(err);
                          });
                        }

                        connection.commit((err) => {
                          if (err) {
                            return connection.rollback(() => {
                              reject(err);
                            });
                          }
                          resolve({ imageUrl: imageUrl });
                        });
                      }
                    );
                  }
                );
              }
            });
          }
        }
      });
    });
  }
}

export default ProfileService;
