const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mshahengr82@gmail.com',
    pass: process.env.GMAIL_PASS,
  },
});
const sendMail = (to, sub, msg) => {
  transporter.sendMail({
    to: to,
    subject: sub,
    html: msg,
  });
  console.log('email sent!');
};

module.exports = sendMail;
