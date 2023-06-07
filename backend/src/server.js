const express = require("express");
const cors = require("cors")
const passwordModel = require("./dbPasswordSchema.js");

// Define port
const port = 3600;

// Create Express app
const app = express();

// Add CORS to all routes and methods
app.use(cors());

// Enable parsing of JSON bodies
app.use(express.json());

// start listening to the port
app.listen(port, () => {
    console.log("Listening on " + port + ".");
  }); 

// Get all passwords
app.route("/passwords").get(async (req, res) => {
    let passwords = [];
    try{
      passwords = await passwordModel.find({});
      res.status(201).json(passwords);
    } catch(err) {
      res.status(500).send(err);
    }
});

// Get a specific password
app.route("/password-edit/:id").get(async (req, res) => {
    const id = req.params.id;

    try{
      const result = await passwordModel.findById(id);

      if (!result) {
        res.status(404).json({ error: "Searched password not found" });
        return;
      }
      res.status(201).json(result);
    } catch(err) {
      res.status(500).send(err);
    }
});

// Create a new password
app.route("/passwords-edit").post(async (req, res) => {
    const doc = new passwordModel(req.body);

    try {
      await doc.save();
      
      res.status(201).json({ message: "New password created" });
    } catch(err) {
      res.status(500).send(err);
    }
  });

// Update a password
app.route("/passwords-edit/:id").put(async (req, res) => {
    const id = req.params.id;
    const docBody = req.body;

    try {
      const result = await passwordModel.findByIdAndUpdate(id, docBody);

      if (result.matchedCount == 0) {
        res.status(404).json({ error: "Could not find password to update" });
        return;
      }
      res.status(201).json(result);
    } catch(err) {
      res.status(500).send(err);
    }
  });

// Delete a password
app.route("/passwords/:id").delete(async (req, res) => {
    const id = req.params.id;

    try {
      const result = await passwordModel.findByIdAndDelete(id);

      if (!result) {
        res.status(404).json({ error: "password not found" });
      }
      res.status(201).send(result);
    } catch(err) {
      res.status(500).send(err);
    }
  });
