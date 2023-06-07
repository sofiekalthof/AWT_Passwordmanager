var $acq34$express = require("express");
var $acq34$cors = require("cors");
var $acq34$mongoose = require("mongoose");
var $acq34$dotenv = require("dotenv");



var $0de2a5c78dcd94bb$exports = {};
var $cbca93fa3933a6d7$exports = {};


$acq34$dotenv.config();
// Initialize parameters
const $cbca93fa3933a6d7$var$dbName = "mean-passwordManager";
// database connection string
const $cbca93fa3933a6d7$var$dbUrl = "mongodb+srv://admin:xOuG5xzD7E4ZZCdF@mycluster.upxjjyn.mongodb.net/?retryWrites=true&w=majority";
// create database connection
$acq34$mongoose.connect($cbca93fa3933a6d7$var$dbUrl, {
    dbName: $cbca93fa3933a6d7$var$dbName
}).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Error connecting to DB", err);
});
$cbca93fa3933a6d7$exports = $acq34$mongoose;


// Initialize parameters
const $0de2a5c78dcd94bb$var$collectionName = "passwords";
// create mongoose schema
const $0de2a5c78dcd94bb$var$passwordSchema = new $cbca93fa3933a6d7$exports.Schema({
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
let $0de2a5c78dcd94bb$var$passwordModel = $cbca93fa3933a6d7$exports.model($0de2a5c78dcd94bb$var$collectionName, schema = $0de2a5c78dcd94bb$var$passwordSchema);
// export model
$0de2a5c78dcd94bb$exports = $0de2a5c78dcd94bb$var$passwordModel;


// Define port
const $bd295355364a39aa$var$port = 3600;
// Create Express app
const $bd295355364a39aa$var$app = $acq34$express();
// Add CORS to all routes and methods
$bd295355364a39aa$var$app.use($acq34$cors());
// Enable parsing of JSON bodies
$bd295355364a39aa$var$app.use($acq34$express.json());
// start listening to the port
$bd295355364a39aa$var$app.listen($bd295355364a39aa$var$port, ()=>{
    console.log("Listening on " + $bd295355364a39aa$var$port + ".");
});
// Get all passwords
$bd295355364a39aa$var$app.route("/passwords").get(async (req, res)=>{
    let passwords = [];
    try {
        passwords = await $0de2a5c78dcd94bb$exports.find({});
        res.status(201).json(passwords);
    } catch (err) {
        res.status(500).send(err);
    }
});
// Get a specific password
$bd295355364a39aa$var$app.route("/password-edit/:id").get(async (req, res)=>{
    const id = req.params.id;
    try {
        const result = await $0de2a5c78dcd94bb$exports.findById(id);
        if (!result) {
            res.status(404).json({
                error: "Searched password not found"
            });
            return;
        }
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});
// Create a new password
$bd295355364a39aa$var$app.route("/passwords-edit").post(async (req, res)=>{
    const doc = new $0de2a5c78dcd94bb$exports(req.body);
    try {
        await doc.save();
        res.status(201).json({
            message: "New password created"
        });
    } catch (err) {
        res.status(500).send(err);
    }
});
// Update a password
$bd295355364a39aa$var$app.route("/passwords-edit/:id").put(async (req, res)=>{
    const id = req.params.id;
    const docBody = req.body;
    try {
        const result = await $0de2a5c78dcd94bb$exports.findByIdAndUpdate(id, docBody);
        if (result.matchedCount == 0) {
            res.status(404).json({
                error: "Could not find password to update"
            });
            return;
        }
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});
// Delete a password
$bd295355364a39aa$var$app.route("/passwords/:id").delete(async (req, res)=>{
    const id = req.params.id;
    try {
        const result = await $0de2a5c78dcd94bb$exports.findByIdAndDelete(id);
        if (!result) res.status(404).json({
            error: "password not found"
        });
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});


//# sourceMappingURL=index.js.map
