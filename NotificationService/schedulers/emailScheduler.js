/*

-- Here we are going to have the  logic to schedule the sending of the email

*/

const cron = require("node-cron");
const Notification = require("../models/notification.model")
const emailTransporter = require("../notifiers/emailService")

cron.schedule("*/10 * * * * *", async ()=>{

    // write the logic to read from the DB and send mail


    // fetch all the  notification requests which are in UN_SENT status
    console.log("Inside the scheduler");
    const notifications = await Notification.find({status: "UN_SENT"})
    console.log(notifications);
    // send the email notification corresponding to each of those requests
    if(notifications){
    console.log("No of un-sent requests are : ", notifications.length);
    }

    // send the email for each single notification request

    notifications.forEach( n =>{
        const mailObj = {
            to: n.recepientEmails,
            subject : n.subject,
            text : n.content
        }
        console.log("Sending email for : ", mailObj);
        emailTransporter.sendMail(mailObj, async (err, info)=>{
            if(err){
                console.log("Error while sending email ", err.message);
            }else{
                console.log("Successfully sent the email ", info);

                // I need to go and update the status of the notification
                n.status = "SENT";
                await n.save();

            }
        })
    })
});
