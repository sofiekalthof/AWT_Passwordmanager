const mongoose = require("mongoose");
const express = require("express");
require('dotenv').config();

const app = express();

// Initialize parameters
const dbName = process.env.DB_NAME;

// database connection string
const dbUrl = process.env.MONGODB_URL;

// create database connection
mongoose.connect(dbUrl, {
    dbName: dbName
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Error connecting to DB", err);
    })

module.exports = mongoose;