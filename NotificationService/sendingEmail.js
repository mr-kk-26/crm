/*
----- This file will contain the sample code for sending the email
          notification
*/
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465,
  // host: "smtp.gmail.com",
  auth : {
    user: 'gajelli.kiransai@gmail.com',
    pass: 'izaaxcczzfasauzw'
  },
  secure : true
})
console.log(typeof transporter);

// sending email

const mailDataObj = {
  from : 'crm-no-reply@gmail.com',
  to: "gajelli.kiransai@gmail.com","gk.royalinga@gmail.com",
  subject: "testing the code to send email",
  text : "sample text content",
  html : "<b> Hello world ! </b>"
}

transporter.sendMail(mailDataObj, (err, data) =>{
  if(err){
    console.log(err.message);
  }else{
    console.log("email sent sucessfully");
  }
});
