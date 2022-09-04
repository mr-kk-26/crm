const express = require('express');

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");

// Initializing the DB connection

mongoose.connect(dbConfig.DB_URL, ()=>{
  console.log("connected to the db");
}, err =>{
  console.log("some err occured: ", err.message);
})

// Stitch the router to the server.js
require("./routes/notification.route")(app);

// Attach the cron file also

require("./schedulers/emailScheduler");


app.listen(8000, ()=>{  // move this port num to config folder and .env file
  console.log("server startd");
})

/*
--- stitch the router to the server file
*/
