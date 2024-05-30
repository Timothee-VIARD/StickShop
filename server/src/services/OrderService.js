import connection from './DBService.js';
import CustomError from '../errors/CustomError.js';
import { ERROR_CODES } from '../constants/errorCodes.js';

class OrderService {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM orders', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async create(body) {
    const order = {
      orderNumber: body.orderNumber,
      userId: body.userId,
      orderDate: body.orderDate,
      deliveryDate: body.deliveryDate,
      address: body.address,
      city: body.city,
      zipCode: body.zipCode,
      country: body.country,
      paymentMethod: body.paymentMethod,
      totalPrice: body.totalPrice,
      status: body.status
    };
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO orders (orderNumber, userId, orderDate, deliveryDate, address, city, zipCode, country, paymentMethod, totalPrice, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [
          order.orderNumber,
          order.userId,
          order.orderDate,
          order.deliveryDate,
          order.address,
          order.city,
          order.zipCode,
          order.country,
          order.paymentMethod,
          order.totalPrice,
          order.status
        ],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  static async getOrdersByUserId(userId) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM orders WHERE userId = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async getOrderById(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM orders WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            reject(new CustomError('Order not found with this id', ERROR_CODES.OBJECT_NOT_FOUND));
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  }

  static async deleteOrderById(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM orders WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.affectedRows === 0) {
            reject(new CustomError('Order not found with this id', ERROR_CODES.OBJECT_NOT_FOUND));
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  }
}

export default OrderService;
