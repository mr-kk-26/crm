

const mongoose = require("mongoose");
const constants = require("../utils/constants");



const ticketSchema = new mongoose.Schema({

  title : {
    type : String,
    require : true
  },
  ticketPriority : {
    type : Number,
    requried : true,
    default : 4
  },
  description : {
    type : String,
    required : true,
  },
  status : {
    type : String,
    required : true,
    default : constants.ticketStatus.open,
    enum : [constants.ticketStatus.open, constants.ticketStatus.close, constants.ticketStatus.blocked]
  },
  reporter : {
    type : String,
    required : true
  },
  assignee : {
    type : String
  },
  createdAt : {
    type : Date,
    immutable : true,
    default : ()=>{
      return Date.now()
    }
  },
  updatedAt: {
    type : Date,
    default : ()=>{
      return Date.now()
    }
  }
}, {versionkey : false})// this will ensure __v is not created by mongoose

module.exports = mongoose.model("Ticket", ticketSchema);
