import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { logInfo } from '../errors/DisplayError.js';

dotenv.config();

class MailService {
  static async sendMail(email, subject, text) {
    let transporter = nodemailer.createTransport({
      service: `${process.env.EMAIL_SERVICE}`,
      auth: {
        user: `${process.env.EMAIL_APP}`,
        pass: `${process.env.EMAIL_PASS}`
      }
    });

    let mailOptions = {
      from: `${process.env.EMAIL_APP}`,
      to: email,
      subject: subject,
      text: text
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }

  static async receiveMail(subject, text) {
    logInfo('MailService try to send email');

    let transporter = nodemailer.createTransport({
      service: `${process.env.EMAIL_SERVICE}`,
      auth: {
        user: `${process.env.EMAIL_APP}`,
        pass: `${process.env.EMAIL_PASS}`
      }
    });

    let mailOptions = {
      to: `${process.env.EMAIL_APP}`,
      subject: subject,
      text: text
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
}

export default MailService;
