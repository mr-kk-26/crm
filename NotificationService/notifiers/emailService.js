/*
----- This file will contain the sample code for sending the email
          notification
*/
const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  port: 465,
  // host: "gajelli.kiransai@gmail.com",
  service : "gmail",
  auth : {
    user: 'gajelli.kiransai@gmail.com',
    pass: 'izaaxcczzfasauzw'
  },
  secure : true,
})
