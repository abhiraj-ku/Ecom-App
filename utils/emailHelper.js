const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const message = {
    from: "developer.raj77@gmail.com",
    to: options.mail,
    subject: options.subject,
    text: options.message,
  };

  // send mail with defined transport object
  await transporter.sendMail(message);
};

module.exports = sendEmail;
