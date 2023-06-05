//const mongoose = require("mongoose");
const mongoose = require("./dbConnection.js");

// Initialize parameters
const collectionName = process.env.DB_COLLECTION;

// create mongoose schema
const passwordSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  app: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  encryptedPassword: {
    type: String,
    required: true
  }
});

// create model from schema
let passwordModel = mongoose.model(collectionName, schema=passwordSchema);

// export model
module.exports = passwordModel;