/*
---  Define the schema for the notification model

*/

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

  subject : {
    type: String,
    required : true
  },
  recepientEmails :{
    type: String,
    required : true
  },
  content : {
    type : String,
    requried : true
  },
  requester : {
    type : String
  },
  // Move this string literal into the utils module
  status : {
    type : String,
    default : "UN_SENT",
    enum : ['SENT', "UN_SENT"]
  },
  createdAt : {
    type : Date,
    default : () =>{
      return Date.now()
    }
  },
  updatedAt : {
    type : Date,
    default : () =>{
      return Date.now()
    }
  }
})

module.exports = mongoose.model("notification", notificationSchema);
