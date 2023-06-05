const express = require("express");
const passwordModel = require("./dbPasswordSchema.js");

// Create Express app
const app = express();

// Define port
const port = 3600;

// Enable parsing of JSON bodies
app.use(express.json());

// start listening to the port
app.listen(port, () => {
    console.log("Listening on " + port + ".");
  }); 


