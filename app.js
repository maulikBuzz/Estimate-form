const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { insertContactUSData } = require("./app/helper/models");


const app = express();
const PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");

app.use(cors());

require('./config/db')
insertContactUSData()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/", () => {
  return res.status(200).send("Connected... wohoo");
});

var authRouter = require("./app/routes/auth.route"); 
var apiRouter = require("./app/routes/api.route"); 

app.use("/", authRouter); 
app.use("/api/v1", apiRouter); 

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
