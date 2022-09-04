const Notification = require('../models/notification.model');
/*
-- Controller to create the notification

-- Validation of the notification request body, should
   be at : middleware
*/
exports.apple = () =>{
  console.log('apple');
}
exports.acceptNotificationRequest = async (req, res) =>{
  // Create notificationObj to be inserted based on the req body

const notificationObj = {
  subject : req.body.subject,
  recepientEmails : req.body.recepientEmails,
  content : req.body.content,
  requester : req.body.requester,
  status : req.body.status
};
// Save the notification request

const notification = await Notification.create(notificationObj);

try{
  /*
  -- send the tracking id back to the caller
  -- _id of the created notificaiton object can be usedol
  */

  res.status(201).send({
    message : "Request acceptd",
    trackingId : notification._id
  })
}catch(err){
  console.log("Error while storing the notifcation reques ", err.message);
  res.status(500).send({
    message : "Internal Server error"
  })
}
}


/*
-- Controller to fetch the notification details based on
    the notification id
*/

exports.getNotificationDetails = async (req, res) =>{

  try{
    const trackingId = req.params.id;

    const notifcation = await Notification.findOne({_id : trackingId});

    res.status(200).send(notifcation);
  }catch(err){
    console.log("Error while retrieving the notification ", err.message);
    res.status(500).send({
      message : "Internal server error"
    })
  }
}
