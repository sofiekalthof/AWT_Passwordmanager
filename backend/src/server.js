const express = require("express");
require('dotenv').config();
const ObjectId = require("mongodb").ObjectId;
const passwordModel = require("../dbPasswordSchema.js");

// Create Express app
const app = express();

// Enable parsing of JSON bodies
app.use(express.json());

// get all passwords
app.route("/passwords").get(async (req, res) => {
    let passwords = [];
  
    passwords = await passwordModel.find({});

    try{
      res.json(passwords);
      console.log("All passwords found");
    } catch(err) {
      console.log("Error getting all passwords", err);
    }
});

// get a specific password
app.route("/password-edit/:id").get(async (req, res) => {
    const id = req.params.id;

    try{
      const result = await passwordModel.findOne({_id: new ObjectId(id)});

      if (!result) {
        console.log("Password not found");
        return;
      }
      res.json(result);
      console.log("password found");
    } catch(err) {
      console.log("Error getting specific password(password was found)", err);
    }
});

// create a new password
app.route("/passwords-edit").post(async (req, res) => {
    const doc = new passwordModel(req.body);

    try {
      await doc.save();
      
      res.json({ _id: res.insertedId });
    } catch(err) {
      console.log("Error creating new password", err);
    }
  });

// update a password
app.route("/passwords-edit/:id").put(async (req, res) => {
    const id = req.params.id;
    const docBody = req.body;

    try {
      const result = await passwordModel.findByIdAndUpdate(id, docBody);

      if (result.matchedCount == 0) {
        console.log("Could not find password to update");
        return;
      }

      res.json({});
    } catch(err) {
      console.log("Error updating a password", err);
    }
  });

// delete a password
app.route("/passwords/:id").delete(async (req, res) => {
    const id = req.params.id;

    try {
      const result = await passwordModel.findByIdAndDelete(id);

      if (!result) {
        res.status(404);
        console.log("item not found");
      }
      res.status(201).send({});
    } catch(err) {
      res.status(500);
      console.log("Error updating a password", err);
    }
  });



