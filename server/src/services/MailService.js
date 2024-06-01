import nodemailer from 'nodemailer';

class MailService {
  static async sendMail(email, subject, text) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'stickshop.noreply@gmail.com',
        pass: 'nhaa sswj evwr fiig'
      }
    });

    let mailOptions = {
      from: 'stickshop.noreply@gmail.com',
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
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'stickshop.noreply@gmail.com',
        pass: 'nhaa sswj evwr fiig'
      }
    });

    let mailOptions = {
      to: 'stickshop.noreply@gmail.com',
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
