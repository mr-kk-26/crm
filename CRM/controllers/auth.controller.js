/*
----- this file will contain the logic
for the registration of the user and login
of the user.


   USERS :

   -- Customer
        1. Registers and is approved by default
        2. should be able to login

   -- Engineer
        1. should be able to registerd
        2. Initially he/she will be in pending Started
        3. Admin should be able to approve this

   -- Admin
        1. ADMIN user should be only created from
          backend.... No API should be supported for it

*/


const bcrypt =  require("bcryptjs");
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const constants = require("../utils/constants");

/*
  ----- Logic to accept the registration and login

  req ---> what we get from the client
  res --> what we return from the server

*/



exports.signup = async (req, res)=>{
  /*
--- I need to read the data from the reqest body
  */
  if(req.body.userType != constants.userTypes.customer){
    req.body.userStatus = constants.userStatus.pending;
  }

  /*
  --- Convert that into the JS objest for inserting in the mongoDB
  */
  const userObj = {
    name : req.body.name,
    userId : req.body.userId,
    email : req.body.email,
    userType : req.body.userType,
    password : bcrypt.hashSync(req.body.password, 8 ),
    userStatus : req.body.userStatus
  };

  /*
  ---- Insert the data and return the response
  */
  try{
    const userCreated = await User.create(userObj)
    /*
    --- we need to return the newly created user
    as the response.
    --- But we should remove some sensitive fields
       * password
       * __v
    -- we need to create the custom response and return
    */
    const response = {
      name : userCreated.name,
      userid : userCreated.userId,
      email : userCreated.email,
      userType : userCreated.userType,
      userStatus : userCreated.userStatus,
      createdAt : userCreated.createdAt,
      updatedAt : userCreated.updatedAt
    }
    res.status(201).send(response);
  }catch(err){
    console.log("some error: ", err.message);
    res.status(500).send({
      message: "some internal error"
    })
  }
}



/*
------ Logic to sign-in
*/

exports.signin = async (req, res) =>{
  // if the userId passed is correct
  try{

    const user = await User.findOne({userId : req.body.userId});

    if(user == null){
      return res.status(400).send({
        message : "failed ! userId passed doesn't exist"
      });
    }
     // check if the user is in PENDING state

     if(user.userStatus == constants.userStatus.pending){
       return res.status(400).send({
         message : "Not yet approved from the admin"
       })
     }

    // if the password passed is correct
   const passwordIsValid  =  bcrypt.compareSync(req.body.password, user.password);
    console.log(user);
    if(!passwordIsValid){
      return res.status(401).send({
        message : "wrong password"
      });
    }
    // create the jwt token
    const token = jwt.sign({
      id: user.userId
    }, authConfig.secret, {
      expiresIn : 600
    })
    // send the sucessfull login response
    res.status(200).send({
      name: user.name,
      userId : user.userId,
      email : user.email,
      userType : user.userType,
      userStatus : user.userStatus,
      accessToken : token
    });
  }catch(err){
    console.log("Internal error, ", err.message);
    res.status(500).send({
      message: "Some internal error while signin"
    })
  }
}
