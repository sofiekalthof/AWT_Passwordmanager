const mongoose = require("mongoose");
const express = require("express");
require('dotenv').config();

const app = express();

// Initialize parameters
const dbName = process.env.DB_NAME;

// database connection string
const dbUrl = process.env.MONGODB_URL;

const port = 3600;


// create database connection
mongoose.connect(dbUrl, {
    dbName: dbName
    })
    .then(() => {
      console.log("Connected to DB");
      // start listening to the port
      app.listen(port, () => {
        console.log("Listening on " + port + ".");
      }); 
    })
    .catch((err) => {
      console.log("Error connecting to DB", err);
    })

module.exports = mongoose;