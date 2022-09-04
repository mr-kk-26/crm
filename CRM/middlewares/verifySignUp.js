/*
---- This file will have the logic to validate
the incoming request body
*/
const User = require("../models/user.model");
 const constants = require("../utils/constants");

validateSignUpRequestBody = async (req, res, next)=>{
  // validate if name is present
if(!req.body.name){
  return res.status(400).send({
    messsage : "Failed ! User name is not provided"
  })
}

  // validte if the userId is present and it's not duplicate
  if(!req.body.userId){
    return res.status(400).send({
      message : "Failed ! UserId is not provided"
    })
  }

try{
  const user = await User.findOne({ userId: req.body.userId });
// console.log("user:----");
// console.log(user);
  if(user != null){
    return res.status(400).send({
      message :"Failed ! UserId is already taken"
    })
  }
} catch(err){
   return res.status(500).send({
     message : "Internal server error while validating the request"
   })
}

 // Validate if the password is present or // NOT
 /*
 ---- Logic to do extra validations :
  1. it should be of minimum length 10
  2. Alphabets, numerics and special characters atleast one
 */
 if(!req.body.password){
   return res.status(400).send({
     message : "Failed ! password is not provided"
   })
 }

  // validate if the eamil is present, is valid and not duplicate
if(!req.body.email){
  return res.status(400).send({
    message : "Failed ! Email is not provided"
  })
}

if(!isValidEmail(req.body.email)){
  return res.status(400).send({
    message : "Failed ! Not a valid email id"
  })
}
  // validate if the userType is present and valid
if(!req.body.userType){
  return res.status(400).send({
    message: "Failed ! User type is not passed"
  })
}

if(req.body.userType == constants.userTypes.admin){
  res.status(400).send({
    message : "ADMIN regestration is not allowed"
  })
}
const userTypes = [constants.userTypes.customer, constants.userTypes.engineer];

if(!userTypes.includes(req.body.userType)){
  res.status(400).send({
    message : "userType provided is not correct. Possible valuse : CUSTOMER | ADMIN | ENGINEER"
  })
}


 next(); // Give control to the next middleware or controller
}
const isValidEmail = (email) =>{
return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}


const validateSignInRequestBody = (req, res, next)=>{
   if(!req.body.userId){
     return res.status(400).send({
       message : "Failed ! UserId is not provided"
     })
   }

   if(!req.body.password){
     return res.status(400).send({
      })
   }

   next();
}

const verifyRequestBodiesForAuth = {
  validateSignUpRequestBody : validateSignUpRequestBody,
  validateSignInRequestBody : validateSignInRequestBody
}

module.exports = verifyRequestBodiesForAuth
