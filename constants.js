require('dotenv').config()

module.exports = {
    MAIL_SETTINGS: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_EMAIL,
          pass: process.env.MAIL_PASSWORD,
        }
    }
}