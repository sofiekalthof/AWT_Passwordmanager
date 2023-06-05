const mongoose = require("mongoose");

// Initialize parameters
const dbName = "mean-passwordManager";

// database connection string
const dbUrl = "mongodb+srv://admin:xOuG5xzD7E4ZZCdF@mycluster.upxjjyn.mongodb.net/?retryWrites=true&w=majority";

// create database connection
mongoose.connect(dbUrl, {
    dbName: dbName
    })
    .then(() => {
      console.log("Connected to DB");
      // start listening to the port
    })
    .catch((err) => {
      console.log("Error connecting to DB", err);
    })

module.exports = mongoose;