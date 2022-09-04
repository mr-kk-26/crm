/*
--- this file will contains the logic about routing request

--- this file is dedicated to the routing logic for signup  and signin
*/

const authController = require("../controllers/auth.controller")
const {verifySignUp} = require("../middlewares");

module.exports = (app) =>{
  /*
  -- POST /crm/api/v1/auth/signup
  */
  app.post("/crm/api/v1/auth/signup",[verifySignUp.validateSignUpRequestBody], authController.signup);

  // login
  // POST /crm/api/v1/auth/login

  app.post("/crm/api/v1/auth/signin",[verifySignUp.validateSignInRequestBody], authController.signin);
}
